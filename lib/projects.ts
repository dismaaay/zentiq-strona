/**
 * Projekty pokazowe prezentowane w hero (LivePreview) i sekcji „Realizacje".
 * To uczciwie oznaczone projekty demonstracyjne Zentiq: każdy jest żywym,
 * wyrenderowanym DOM-em (components/minisites/*), nie obrazkiem.
 */

export type ProjectId = "halo" | "reda" | "forma";

export type Project = {
  id: ProjectId;
  name: string;
  industry: string;
  /** Jedno zdanie zakresu, pokazywane pod kartą realizacji. */
  scope: string;
  /** Fikcyjna domena wyświetlana w pasku panelu podglądu. */
  domain: string;
  /** Etykieta chipa przełącznika w hero. */
  chip: string;
  /** Kolor tła mini-strony (tło ramki podczas ładowania podglądu). */
  surface: string;
};

export const projects: Project[] = [
  {
    id: "halo",
    name: "Studio Halo",
    industry: "Salon urody",
    scope: "Rezerwacje wizyt online i cennik zabiegów.",
    domain: "studiohalo.pl",
    chip: "Salon urody",
    surface: "#f6efea",
  },
  {
    id: "reda",
    name: "Kancelaria Reda",
    industry: "Kancelaria radcowska",
    scope: "Wizytówka z zakresem spraw i umawianiem konsultacji.",
    domain: "kancelaria-reda.pl",
    chip: "Kancelaria",
    surface: "#f4f2ec",
  },
  {
    id: "forma",
    name: "Pracownia Forma",
    industry: "Meble na wymiar",
    scope: "Portfolio realizacji i zapytania o projekt.",
    domain: "pracowniaforma.pl",
    chip: "Pracownia mebli",
    surface: "#f5f4f0",
  },
];
