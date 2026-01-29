import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CalendarDays, Languages } from "lucide-react";
import { translateToTelugu } from "@/utils/translate";

export default function NoticeCard({ notice }) {
  const [lang, setLang] = useState("en");
  const [translated, setTranslated] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleToggleLanguage = async () => {
    if (lang === "te") {
      setLang("en");
      return;
    }

    if (translated.title && translated.description) {
      setLang("te");
      return;
    }

    try {
      setLoading(true);

      const [titleTe, descTe] = await Promise.all([
        translateToTelugu(notice.title),
        translateToTelugu(notice.description),
      ]);

      setTranslated({
        title: titleTe,
        description: descTe,
      });

      setLang("te");
    } catch {
      alert("Translation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-md border">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-semibold leading-snug">
            {lang === "en" ? notice.title : translated.title}
          </h2>

          {/* <Button
            size="sm"
            variant="secondary"
            className="flex gap-1 shrink-0"
            onClick={handleToggleLanguage}
            disabled={loading}
          >
            <Languages className="h-4 w-4" />
            {loading
              ? "Translating..."
              : lang === "en"
              ? "తెలుగు"
              : "English"}
          </Button> */}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-base leading-relaxed">
          {lang === "en"
            ? notice.description
            : translated.description}
        </p>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          <span>
            Event Date:{" "}
            {new Date(notice.eventDate).toLocaleDateString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
