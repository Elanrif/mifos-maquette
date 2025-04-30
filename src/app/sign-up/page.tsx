"use client";

import type React from "react";

import { useState } from "react";
import {
  ArrowLeftIcon,
  BuildingIcon,
  CalendarIcon,
  CheckIcon,
  FileIcon,
  UploadIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface SignupFormData {
  firstName: string;
  lastName: string;
  island: string;
  city: string;
  street: string;
  dateOfBirth: Date | undefined;
  cin: string;
  identityDocument: File | null;
}

export default function SignupPage() {
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: "",
    lastName: "",
    island: "",
    city: "",
    street: "",
    dateOfBirth: undefined,
    cin: "",
    identityDocument: null,
  });

  const [date, setDate] = useState<Date>();
  const [fileSelected, setFileSelected] = useState<boolean>(false);
  const [fileError, setFileError] = useState<string | null>(null);

  // Liste des îles pour le sélecteur
  const islands = ["Grande Comore", "Anjouan", "Mohéli", "Mayotte"];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setFileSelected(false);
      setFileError(null);
      setFormData({ ...formData, identityDocument: null });
      return;
    }

    // Vérifier si le fichier est un PDF
    if (file.type !== "application/pdf") {
      setFileError("Veuillez télécharger un fichier PDF");
      setFileSelected(false);
      return;
    }

    // Vérifier la taille du fichier (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setFileError("Le fichier est trop volumineux (max 5MB)");
      setFileSelected(false);
      return;
    }

    setFileSelected(true);
    setFileError(null);
    setFormData({ ...formData, identityDocument: file });
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setFormData({ ...formData, dateOfBirth: selectedDate });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous pourriez envoyer les données à votre API kartapay
    console.log("Données du formulaire:", formData);
    // Redirection ou affichage d'un message de succès
  };

  // Composant pour afficher l'astérisque rouge des champs obligatoires
  const RequiredField = () => <span className="text-red-500 ml-1">*</span>;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Sidebar élégante */}
      <div className="hidden md:flex flex-col w-72 bg-gradient-to-b from-primary/90 to-primary/70 text-white">
        <div className="flex h-20 items-center px-6">
          <Link href="/" className="flex items-center gap-3 font-semibold">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary">
              <BuildingIcon className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold">kartapay</span>
          </Link>
        </div>

        <div className="flex-1 flex flex-col justify-center px-6 py-10">
          <h2 className="text-2xl font-bold mb-4">Bienvenue chez kartapay</h2>
          <p className="text-white/80 mb-8">
            Rejoignez notre communauté financière et accédez à nos services
            bancaires innovants.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-primary">
                <UserIcon className="h-4 w-4" />
              </div>
              <span className="font-medium">Créez votre compte</span>
            </div>
            <p className="text-white/70 text-sm pl-11">
              Remplissez le formulaire avec vos informations personnelles pour
              créer votre compte client.
            </p>
          </div>

          <div className="mt-auto pt-10">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Retour au tableau de bord
            </Link>
          </div>
        </div>

        <div className="p-6 bg-primary/80">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
              <UserIcon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium">Support kartapay</p>
              <p className="text-xs text-white/70">support@kartapay.org</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col">
        <header className="flex h-20 items-center gap-4 px-6 md:px-10 border-b border-slate-100">
          <div className="md:hidden">
            <Link href="/">
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <ArrowLeftIcon className="h-5 w-5" />
              </Button>
            </Link>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-slate-800">
              Inscription Client
            </h1>
            <p className="text-slate-500 text-sm">
              Les champs marqués d'un <span className="text-red-500">*</span>{" "}
              sont obligatoires
            </p>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6 md:p-10">
          <div className="mx-auto max-w-3xl">
            <Card className="border-none shadow-lg shadow-slate-200/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl text-slate-800">
                  Formulaire d'inscription
                </CardTitle>
                <CardDescription>
                  Veuillez remplir tous les champs obligatoires pour créer votre
                  compte client kartapay
                </CardDescription>
              </CardHeader>

              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-8">
                  {/* Informations personnelles */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">
                      Informations personnelles
                    </h3>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-slate-700">
                          Prénom
                          <RequiredField />
                        </Label>
                        <Input
                          id="firstName"
                          placeholder="Votre prénom"
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              firstName: e.target.value,
                            })
                          }
                          className="h-12 border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-slate-700">
                          Nom
                          <RequiredField />
                        </Label>
                        <Input
                          id="lastName"
                          placeholder="Votre nom"
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              lastName: e.target.value,
                            })
                          }
                          className="h-12 border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth" className="text-slate-700">
                        Date de naissance
                        <RequiredField />
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="dateOfBirth"
                            variant={"outline"}
                            className={cn(
                              "w-full h-12 justify-start text-left font-normal border-slate-200",
                              !date && "text-slate-400"
                            )}
                          >
                            <CalendarIcon className="mr-3 h-5 w-5 text-slate-400" />
                            {date ? (
                              format(date, "PPP", { locale: fr })
                            ) : (
                              <span>Sélectionner une date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <div className="space-y-2">
                            <Label
                              htmlFor="dateOfBirth"
                              className="text-slate-700"
                            >
                              Date de naissance
                              <RequiredField />
                            </Label>
                            <Input
                              id="dateOfBirth"
                              type="date"
                              className="h-12 border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary"
                              required
                              max={new Date().toISOString().split("T")[0]}
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cin" className="text-slate-700">
                        Numéro CIN (Carte d'Identité Nationale)
                        <RequiredField />
                      </Label>
                      <Input
                        id="cin"
                        placeholder="Votre numéro d'identité"
                        value={formData.cin}
                        onChange={(e) =>
                          setFormData({ ...formData, cin: e.target.value })
                        }
                        className="h-12 border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary"
                        required
                      />
                    </div>
                  </div>

                  {/* Adresse */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">
                      Adresse
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="island" className="text-slate-700">
                        Île
                        <RequiredField />
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData({ ...formData, island: value })
                        }
                        value={formData.island}
                        required
                      >
                        <SelectTrigger
                          id="island"
                          className="h-12 border-slate-200 focus:ring-1 focus:ring-primary"
                        >
                          <SelectValue placeholder="Sélectionner une île" />
                        </SelectTrigger>
                        <SelectContent>
                          {islands.map((island) => (
                            <SelectItem key={island} value={island}>
                              {island}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-slate-700">
                        Ville ou Village
                        <RequiredField />
                      </Label>
                      <Input
                        id="city"
                        placeholder="Votre ville ou village"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        className="h-12 border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="street" className="text-slate-700">
                        Rue / Quartier
                      </Label>
                      <Input
                        id="street"
                        placeholder="Votre adresse complète"
                        value={formData.street}
                        onChange={(e) =>
                          setFormData({ ...formData, street: e.target.value })
                        }
                        className="h-12 border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                  {/* Document d'identité */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">
                      Document d'identité
                    </h3>

                    <div className="space-y-4">
                      <Label
                        htmlFor="identityDocument"
                        className="text-slate-700"
                      >
                        Télécharger une pièce d'identité (PDF)
                        <RequiredField />
                      </Label>
                      <div className="flex items-center gap-4">
                        <Label
                          htmlFor="identityDocument"
                          className={`flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed ${
                            fileSelected
                              ? "border-primary/30 bg-primary/5"
                              : "border-slate-200 hover:bg-slate-50"
                          } px-6 py-4 text-center transition-colors`}
                        >
                          <div className="flex flex-col items-center gap-2">
                            {fileSelected ? (
                              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <FileIcon className="h-7 w-7" />
                              </div>
                            ) : (
                              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                                <UploadIcon className="h-7 w-7" />
                              </div>
                            )}

                            <span className="text-base font-medium text-slate-700">
                              {fileSelected
                                ? "Document sélectionné"
                                : "Cliquez pour télécharger"}
                            </span>
                            <span className="text-sm text-slate-500">
                              PDF uniquement (max 5MB)
                            </span>
                          </div>
                          <Input
                            id="identityDocument"
                            type="file"
                            accept="application/pdf"
                            className="hidden"
                            onChange={handleFileChange}
                            required
                          />
                        </Label>
                      </div>

                      {fileSelected && (
                        <div className="mt-4 flex items-center gap-3 rounded-lg bg-primary/5 p-3 text-sm text-primary">
                          <CheckIcon className="h-5 w-5" />
                          <div className="flex flex-1 items-center">
                            <span>Fichier prêt à être envoyé</span>
                            <Badge
                              variant="outline"
                              className="ml-3 bg-white flex items-center gap-1 px-3 py-1"
                            >
                              <FileIcon className="h-3 w-3" />
                              <span className="truncate max-w-[200px]">
                                {formData.identityDocument?.name}
                              </span>
                            </Badge>
                          </div>
                        </div>
                      )}

                      {fileError && (
                        <div className="mt-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                          {fileError}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between border-t p-6">
                  <Button
                    variant="outline"
                    type="button"
                    asChild
                    className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-800"
                  >
                    <Link href="/">Annuler</Link>
                  </Button>

                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary/90"
                  >
                    Créer le compte
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
