"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import MiniPlayer from "../components/MiniPlayer";

type Track = {
  id: string;
  title: string;
  bpm: number;
  moods: string[];
  instrument_groups: string[];
  file_url: string | null;
  preview_url?: string | null;
  duration?: number; // 
};

export default function MusicPage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [moods, setMoods] = useState<string[]>([]);
  const [instrumentGroups, setInstrumentGroups] = useState<string[]>([]);

  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);
  const [minBpm, setMinBpm] = useState<number | null>(null);
  const [maxBpm, setMaxBpm] = useState<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [openMoods, setOpenMoods] = useState(true);
  const [openInstruments, setOpenInstruments] = useState(true);
  const [openBpm, setOpenBpm] = useState(true);

  const [favorites, setFavorites] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [purchases, setPurchases] = useState<any[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};
   const loadDurations = async (tracksData: Track[]) => {
  const updatedTracks = await Promise.all(
    tracksData.map(async (track) => {
      if (!track.preview_url) return track;

      return new Promise<Track>((resolve) => {
        const audio = new Audio(track.preview_url as string);

        audio.addEventListener("loadedmetadata", () => {
          resolve({
            ...track,
            duration: audio.duration,
          });
        });

        audio.addEventListener("error", () => {
          resolve(track);
        });
      });
    })
  );

  setTracks(updatedTracks);
};

  const fetchFilters = async () => {
    const { data: moodsData } = await supabase.from("moods").select("name");
    const { data: instrumentsData } = await supabase
      .from("instrument_groups")
      .select("name");

    if (moodsData) setMoods(moodsData.map((m) => m.name));
    if (instrumentsData) setInstrumentGroups(instrumentsData.map((i) => i.name));
  };

  const fetchTracks = async () => { 
console.log("FETCHING TRACKS...");
    setLoading(true);

  let query = supabase.from("tracks_with_filters").select("*");

  if (selectedMoods.length > 0)
    query = query.overlaps("moods", selectedMoods);
  
  if (selectedInstruments.length > 0)
    query = query.overlaps("instrument_groups", selectedInstruments);

  if (minBpm !== null)
    query = query.gte("bpm", minBpm);

  if (maxBpm !== null)
    query = query.lte("bpm", maxBpm);

  const { data, error } = await query;

  if (error) {
    console.error(error);
  }

 if (data) {
  console.log(data);
  await loadDurations(data); // 👈 вместо setTracks
}


  setLoading(false);
};


  // 🔹 Отримати користувача
  const fetchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) setUserId(user.id);
  };

  // 🔹 Завантажити favorites
  const fetchFavorites = async () => {
    if (!userId) return;

    const { data } = await supabase
      .from("favorites")
      .select("track_id")
      .eq("user_id", userId);

    if (data) {
      setFavorites(data.map((f) => f.track_id));
    }
  };

  // 🔹 Завантажити purchases
const fetchPurchases = async () => {
  if (!userId) return;

  const { data } = await supabase
    .from("purchases")
    .select("*")
    .eq("user_id", userId);

  if (data) {
    setPurchases(data);
  }
};

  // 🔹 Перемикання сердечка
  const toggleFavorite = async (trackId: string) => {
    if (!userId) return;

    if (favorites.includes(trackId)) {
      await supabase
        .from("favorites")
        .delete()
        .eq("user_id", userId)
        .eq("track_id", trackId);

      setFavorites(favorites.filter((id) => id !== trackId));
    } else {
      await supabase.from("favorites").insert({
        user_id: userId,
        track_id: trackId,
      });

      setFavorites([...favorites, trackId]);
    }
  };
  // 🔹 Скачать трек
const handleDownload = async (trackId: string) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
  setShowLoginModal(true);
  return;
}

  const res = await fetch(`/api/download?trackId=${trackId}`, {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  const data = await res.json();

  if (data.url) {
    window.location.href = data.url;
  } else {
    alert(data.error || "Download failed");
  }
};
const handleInlineLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  const { error } = await supabase.auth.signInWithOtp({
    email: loginEmail,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    setLoginMessage("Fehler: " + error.message);
  } else {
    setLoginMessage(
      "Bitte überprüfe deine E-Mail – wir haben dir einen Login-Link gesendet."
    );
  }
};


  useEffect(() => {
    fetchFilters();
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
  if (userId) {
    fetchFavorites();
    fetchPurchases();
  }
}, [userId]);


  

  useEffect(() => {
    fetchTracks();
  }, [selectedMoods, selectedInstruments, minBpm, maxBpm]);

  // ✅ Оце головне: треки для показу з урахуванням "Show Favorites Only"
  const filteredTracks = showFavoritesOnly
    ? tracks.filter((t) => favorites.includes(t.id))
    : tracks;

  return (
    <div className="min-h-screen text-white flex relative overflow-hidden bg-gradient-to-br from-black via-zinc-950 to-black">
      {/* Emerald Glow */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-400/10 blur-[120px] rounded-full pointer-events-none" />

      {/* SIDEBAR */}
      <div className="w-80 p-6 border-r border-zinc-800/50 backdrop-blur-md bg-zinc-900/40 overflow-y-auto relative z-10">
        <h2 className="text-xl font-bold mb-6">Filter</h2>

        {/* MOODS */}
        <button
          onClick={() => setOpenMoods(!openMoods)}
          className="w-full text-left font-semibold mb-3 text-emerald-400"
        >
          Moods
        </button>

        {openMoods && (
          <div className="space-y-3 mb-6">
            {moods.map((mood) => (
              <label key={mood} className="flex items-center gap-3 cursor-pointer group">
                <div
                  className={`w-4 h-4 border rounded flex items-center justify-center transition-all
                  ${
                    selectedMoods.includes(mood)
                      ? "bg-emerald-500 border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                      : "border-zinc-500"
                  }`}
                >
                  {selectedMoods.includes(mood) && <div className="w-2 h-2 bg-black rounded-sm" />}
                </div>

                <input
                  type="checkbox"
                  className="hidden"
                  checked={selectedMoods.includes(mood)}
                  onChange={() => {
                    if (selectedMoods.includes(mood)) {
                      setSelectedMoods(selectedMoods.filter((m) => m !== mood));
                    } else {
                      setSelectedMoods([...selectedMoods, mood]);
                    }
                  }}
                />
                <span
                  className={`text-sm transition ${
                    selectedMoods.includes(mood)
                      ? "text-emerald-400"
                      : "text-zinc-300 group-hover:text-emerald-400"
                  }`}
                >
                  {mood}
                </span>
              </label>
            ))}
          </div>
        )}

        {/* INSTRUMENTS */}
        <button
          onClick={() => setOpenInstruments(!openInstruments)}
          className="w-full text-left font-semibold mb-3 text-emerald-400"
        >
          Instruments
        </button>

        {openInstruments && (
          <div className="space-y-3 mb-6">
            {instrumentGroups.map((instrument) => (
              <label key={instrument} className="flex items-center gap-3 cursor-pointer group">
                <div
                  className={`w-4 h-4 border rounded flex items-center justify-center transition-all
                  ${
                    selectedInstruments.includes(instrument)
                      ? "bg-emerald-500 border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                      : "border-zinc-500"
                  }`}
                >
                  {selectedInstruments.includes(instrument) && (
                    <div className="w-2 h-2 bg-black rounded-sm" />
                  )}
                </div>

                <input
                  type="checkbox"
                  className="hidden"
                  checked={selectedInstruments.includes(instrument)}
                  onChange={() => {
                    if (selectedInstruments.includes(instrument)) {
                      setSelectedInstruments(selectedInstruments.filter((i) => i !== instrument));
                    } else {
                      setSelectedInstruments([...selectedInstruments, instrument]);
                    }
                  }}
                />
                <span
                  className={`text-sm transition ${
                    selectedInstruments.includes(instrument)
                      ? "text-emerald-400"
                      : "text-zinc-300 group-hover:text-emerald-400"
                  }`}
                >
                  {instrument}
                </span>
              </label>
            ))}
          </div>
        )}

        {/* BPM */}
        <button
          onClick={() => setOpenBpm(!openBpm)}
          className="w-full text-left font-semibold mb-3 text-emerald-400"
        >
          BPM
        </button>

        {openBpm && (
          <div className="space-y-3 mb-6">
            <input
              type="number"
              placeholder="Min BPM"
              onChange={(e) => setMinBpm(e.target.value ? Number(e.target.value) : null)}
              className="bg-zinc-900/70 border border-zinc-700 p-2 rounded w-full focus:border-emerald-500 focus:outline-none"
            />
            <input
              type="number"
              placeholder="Max BPM"
              onChange={(e) => setMaxBpm(e.target.value ? Number(e.target.value) : null)}
              className="bg-zinc-900/70 border border-zinc-700 p-2 rounded w-full focus:border-emerald-500 focus:outline-none"
            />
          </div>
        )}

        {/* FAVORITES FILTER */}
        <div className="mt-8 pt-6 border-t border-zinc-800">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div
              className={`w-4 h-4 border rounded flex items-center justify-center transition-all
              ${
                showFavoritesOnly ? "bg-emerald-500 border-emerald-500" : "border-zinc-500"
              }`}
            >
              {showFavoritesOnly && <div className="w-2 h-2 bg-black rounded-sm" />}
            </div>

            <input
              type="checkbox"
              className="hidden"
              checked={showFavoritesOnly}
              onChange={() => setShowFavoritesOnly(!showFavoritesOnly)}
            />

            <span
              className={`text-sm transition ${
                showFavoritesOnly ? "text-emerald-400" : "text-zinc-300 group-hover:text-emerald-400"
              }`}
            >
              Show Favorites Only
            </span>
          </label>
        </div>
      </div>

      {/* TRACK LIST */}
      <div className="flex-1 p-10 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Music Library</h1>
          <span className="text-zinc-400 text-sm">
            {loading ? "Loading..." : `${filteredTracks.length} tracks found`}
          </span>
        </div>

        {loading ? (
  <div className="space-y-6">
    {[...Array(4)].map((_, i) => (
      <div
        key={i}
        className="h-24 bg-zinc-900/50 rounded-xl animate-pulse"
      />
    ))}
  </div>
) : filteredTracks.length === 0 ? (
  <p className="text-zinc-500">No tracks found.</p>
) : (
  <div className="space-y-6">
    {filteredTracks.map((track) => {
      const purchase = purchases.find(p => p.track_id === track.id);
      const canDownload = purchase && purchase.downloads_remaining > 0;

      const isFavorite = favorites.includes(track.id);

      return (
        <div
          key={track.id}
          className="p-6 bg-zinc-900/60 backdrop-blur-md border border-zinc-800 rounded-xl hover:border-emerald-500/40 hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] transition-all duration-300 flex justify-between items-start"
        >
          {/* LEFT SIDE */}
          <div className="flex-1 pr-6">
            <h3 className="font-semibold text-lg mb-1">
              {track.title}
            </h3>
            
            <p className="text-xs text-red-400">
              Track ID: {track.id}
            </p>


            <p className="text-sm text-zinc-400 mb-4 flex gap-6">
  <span>BPM: {track.bpm}</span>
  {track.duration && (
    <span>⏱ {formatTime(track.duration)}</span>
  )}
</p>


            {track.preview_url && (
  <MiniPlayer 
  audioUrl={track.preview_url} 
  trackId={track.id}
/>
)}
          </div>

          {/* RIGHT SIDE */}
<div className="flex flex-col items-end gap-3">

<button
  onClick={() => {
    if (!userId) {
      setShowLoginModal(true);
      return;
    }

    if (!canDownload) {
      setSelectedTrackId(track.id);
      setShowPurchaseModal(true);
      return;
    }

    handleDownload(track.id);
  }}
  className="px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-500 rounded-lg transition"
>
  {canDownload ? "Download" : "Kaufen"}
</button>


  <button
    onClick={() => toggleFavorite(track.id)}
    className={`text-2xl transition-all duration-200 ${
      isFavorite
        ? "text-emerald-400 scale-110"
        : "text-zinc-500 hover:text-emerald-400"
    }`}
  >
    {isFavorite ? "❤️" : "🤍"}
  </button>

</div>

        </div>
      );
    })}
  </div> 
)}
</div>
{showLoginModal && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div className="bg-zinc-900 p-8 rounded-xl w-96 text-white space-y-4">

      <h2 className="text-xl font-bold text-center">
        Mit E-Mail anmelden
      </h2>

      <form onSubmit={handleInlineLogin} className="space-y-4">

        <input
          type="email"
          placeholder="E-Mail eingeben"
          required
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
        />

        <button
          type="submit"
          className="w-full bg-emerald-500 text-black font-semibold py-3 rounded-lg"
        >
          Login-Link erhalten
        </button>

      </form>

      {loginMessage && (
        <p className="text-sm text-center text-zinc-400">
          {loginMessage}
        </p>
      )}

      <button
        onClick={() => {
          setShowLoginModal(false);
          setLoginMessage("");
          setLoginEmail("");
        }}
        className="w-full text-zinc-400 hover:text-white transition pt-2"
      >
        Abbrechen
      </button>

    </div>
  </div>
)}

{showPurchaseModal && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div className="bg-zinc-900 p-8 rounded-xl w-96 text-white space-y-4">

      <h2 className="text-xl font-bold text-center">
        Purchase Required
      </h2>

      <p className="text-sm text-zinc-400 text-center">
        You need to purchase this track before downloading.
      </p>

    <button
  className="w-full bg-emerald-500 text-black font-semibold py-3 rounded-lg"
  onClick={async () => {
    const { error } = await supabase.from("purchases").insert({
      user_id: userId,
      track_id: selectedTrackId,
      package_size: 1,
      plan_type: "single",
      downloads_total: 5,
      downloads_remaining: 5,
    });

    console.log("ERROR:", error);
    console.log("selectedTrackId:", selectedTrackId);


    if (!error) {
      await fetchPurchases();
      setShowPurchaseModal(false);
      setSelectedTrackId(null);
    }
  }}
>
  Proceed to Payment
</button>


      <button
        onClick={() => {
          setShowPurchaseModal(false);
          setSelectedTrackId(null);
        }}
        className="w-full text-zinc-400 hover:text-white transition pt-2"
      >
        Cancel
      </button>

    </div>
  </div>
)}


    </div>
  );
}