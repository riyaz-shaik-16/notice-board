import { useState } from "react";
import { Button } from "@/components/ui/button";
import { translateToTelugu } from "@/utils/translate";

export default function NoticeCard({ notice }) {
  const [lang, setLang] = useState("en");
  const [translated, setTranslated] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleToggleLanguage = async () => {
    // Switch back to English
    if (lang === "te") {
      setLang("en");
      return;
    }

    // Already translated → reuse
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
    } catch (err) {
      alert("Translation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-lg p-4 space-y-2">
      <div className="flex justify-between items-start">
        <h2 className="font-bold text-lg">
          {lang === "en" ? notice.title : translated.title}
        </h2>

        <Button
          size="sm"
          variant="outline"
          onClick={handleToggleLanguage}
          disabled={loading}
        >
          {loading
            ? "Translating..."
            : lang === "en"
            ? "తెలుగు"
            : "English"}
        </Button>
      </div>

      <p>
        {lang === "en"
          ? notice.description
          : translated.description}
      </p>

      <p className="text-sm text-muted-foreground">
        Event Date:{" "}
        {new Date(notice.eventDate).toLocaleDateString()}
      </p>
    </div>
  );
}
