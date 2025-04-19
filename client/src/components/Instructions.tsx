import { Card, CardContent } from "@/components/ui/card";

export default function Instructions() {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-2">Instruccions</h2>
        <p className="mb-2">
          Selecciona un mode de pràctica i completa els elements de la taula periòdica.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Mode "Completa els Símbols": Escriu el símbol químic de cada element</li>
          <li>Mode "Completa els Noms": Escriu el nom complet de cada element</li>
          <li>Mode "Completa Ambdós": Escriu tant el símbol com el nom de cada element</li>
        </ul>
        <p className="mt-2">
          Clica "Reiniciar" per començar un nou joc en qualsevol moment.
        </p>
      </CardContent>
    </Card>
  );
}
