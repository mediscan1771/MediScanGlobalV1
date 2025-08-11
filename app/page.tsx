"use client";
import React, { useEffect, useState } from "react";
import {
  Globe,
  Pill,
  ChevronRight,
  Settings,
  Bookmark,
  PlusCircle,
  Activity,
  FlaskConical,
  Microscope,
  FileText,
  BadgeCheck,
  AlertTriangle,
  DollarSign,
  Link as LinkIcon,
  Stethoscope,
  Languages,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Page() {
  const [region, setRegion] = useState("Global");
  const [lang, setLang] = useState("EN"); // default to EN
  const [saved, setSaved] = useState(new Set());
  const [watchlist, setWatchlist] = useState(["Lenvatinib", "Pembrolizumab"]);
  const [citationsOpen, setCitationsOpen] = useState(false);
  const [active, setActive] = useState(null);
  const [state, setState] = useState({
    date: "",
    highlights: [],
    trials: [],
    research: [],
  });

  useEffect(() => {
    fetch("/api/mock")
      .then((r) => r.json())
      .then((d) => setState(d));
  }, []);

  const toggleSave = (id) =>
    setSaved((p) => {
      const n = new Set(p);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  const addWatch = () => {
    const t = window.prompt("Add to watchlist…");
    if (t && !watchlist.includes(t)) setWatchlist((w) => [...w, t]);
  };

  const openCite = (title, citations) => {
    setActive({ title, citations });
    setCitationsOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* HEADER */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white grid place-items-center shadow-sm">
              <Stethoscope className="w-5 h-5" />
            </div>
            <h1 className="text-lg font-semibold leading-tight">
              MediScan Global
            </h1>
          </div>

          {/* Top right: region + lang */}
          <div className="flex items-center gap-4 text-sm">
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="border rounded-md px-2 py-1"
            >
              <option>Global</option>
              <option>EU</option>
              <option>US</option>
            </select>

            {/* Language display only */}
            <div className="text-slate-600">{lang}</div>
          </div>
        </div>
      </header>

      {/* BODY */}
      <main className="mx-auto max-w-7xl px-4 py-6">
        {/* Watchlist */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-semibold">Watchlist</h2>
            <Button variant="outline" size="sm" onClick={addWatch}>
              <PlusCircle className="w-4 h-4 mr-1" /> Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {watchlist.map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>
        </section>

        {/* Highlights */}
        <section className="mb-6">
          <h2 className="text-base font-semibold mb-2">Daily Highlights</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {state.highlights.map((h) => (
              <Card key={h.id} className="hover:shadow-md transition">
                <CardHeader>
                  <CardTitle className="text-sm font-medium">
                    {h.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-slate-600">
                  {h.summary}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
