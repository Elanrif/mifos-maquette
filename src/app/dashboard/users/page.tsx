import {
  BanknoteIcon,
  BarChart3Icon,
  BookIcon,
  BuildingIcon,
  CreditCardIcon,
  FilterIcon,
  LayoutDashboardIcon,
  PieChartIcon,
  SettingsIcon,
  UserIcon,
  UsersIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Définition des types
interface Account {
  id: string;
  clientId: string;
  clientName: string;
  label: string;
  balance: number;
  type: "courant" | "epargne";
  status: "actif" | "inactif" | "fermé";
  openedDate: string;
  productId: string;
  interestRate?: number;
  maturityDate?: string;
}

interface Operation {
  id: string;
  accountId: string;
  date: string;
  motif: string;
  amount: number;
  type: "credit" | "debit";
}

// Données de démonstration pour les comptes Mifos
const accounts: Account[] = [
  {
    id: "000000001",
    clientId: "CL000123",
    clientName: "Jean Dupont",
    label: "Compte Courant Standard",
    balance: 2450.75,
    type: "courant",
    status: "actif",
    openedDate: "2023-01-15",
    productId: "CC001",
  },
  {
    id: "000000002",
    clientId: "CL000123",
    clientName: "Jean Dupont",
    label: "Compte Épargne Volontaire",
    balance: 5780.5,
    type: "epargne",
    status: "actif",
    openedDate: "2023-02-20",
    productId: "EP002",
    interestRate: 2.5,
  },
  {
    id: "000000003",
    clientId: "CL000456",
    clientName: "Marie Martin",
    label: "Compte Courant Basique",
    balance: 1250.25,
    type: "courant",
    status: "actif",
    openedDate: "2023-03-10",
    productId: "CC001",
  },
  {
    id: "000000004",
    clientId: "CL000456",
    clientName: "Marie Martin",
    label: "Compte Épargne Terme",
    balance: 22450.0,
    type: "epargne",
    status: "actif",
    openedDate: "2023-01-05",
    productId: "EP003",
    interestRate: 3.2,
    maturityDate: "2024-01-05",
  },
  {
    id: "000000005",
    clientId: "CL000789",
    clientName: "Pierre Durand",
    label: "Compte Courant Business",
    balance: 7890.35,
    type: "courant",
    status: "actif",
    openedDate: "2023-04-18",
    productId: "CC002",
  },
  {
    id: "000000006",
    clientId: "CL000789",
    clientName: "Pierre Durand",
    label: "Compte Épargne Projet",
    balance: 15000.0,
    type: "epargne",
    status: "actif",
    openedDate: "2023-05-22",
    productId: "EP001",
    interestRate: 1.8,
  },
];

// Données de démonstration pour les opérations de compte
const operations: Operation[] = [
  {
    id: "OP000001",
    accountId: "000000001",
    date: "2023-04-15",
    motif: "Virement entrant",
    amount: 750.0,
    type: "credit",
  },
  {
    id: "OP000002",
    accountId: "000000001",
    date: "2023-04-10",
    motif: "Paiement facture électricité",
    amount: -89.5,
    type: "debit",
  },
  {
    id: "OP000003",
    accountId: "000000001",
    date: "2023-04-05",
    motif: "Retrait DAB",
    amount: -200.0,
    type: "debit",
  },
  {
    id: "OP000004",
    accountId: "000000002",
    date: "2023-04-12",
    motif: "Dépôt épargne mensuel",
    amount: 300.0,
    type: "credit",
  },
  {
    id: "OP000005",
    accountId: "000000002",
    date: "2023-03-25",
    motif: "Intérêts créditeurs",
    amount: 12.75,
    type: "credit",
  },
  {
    id: "OP000006",
    accountId: "000000003",
    date: "2023-04-08",
    motif: "Salaire",
    amount: 1850.0,
    type: "credit",
  },
  {
    id: "OP000007",
    accountId: "000000003",
    date: "2023-04-02",
    motif: "Loyer",
    amount: -650.0,
    type: "debit",
  },
  {
    id: "OP000008",
    accountId: "000000004",
    date: "2023-03-30",
    motif: "Versement exceptionnel",
    amount: 5000.0,
    type: "credit",
  },
  {
    id: "OP000009",
    accountId: "000000005",
    date: "2023-04-14",
    motif: "Paiement fournisseur",
    amount: -1250.75,
    type: "debit",
  },
  {
    id: "OP000010",
    accountId: "000000006",
    date: "2023-04-01",
    motif: "Transfert depuis compte courant",
    amount: 500.0,
    type: "credit",
  },
  {
    id: "OP000011",
    accountId: "000000001",
    date: "2023-03-28",
    motif: "Achat en ligne",
    amount: -120.5,
    type: "debit",
  },
  {
    id: "OP000012",
    accountId: "000000002",
    date: "2023-03-20",
    motif: "Virement programmé",
    amount: 200.0,
    type: "credit",
  },
  {
    id: "OP000013",
    accountId: "000000003",
    date: "2023-03-15",
    motif: "Remboursement assurance",
    amount: 175.25,
    type: "credit",
  },
  {
    id: "OP000014",
    accountId: "000000004",
    date: "2023-03-10",
    motif: "Frais bancaires",
    amount: -12.0,
    type: "debit",
  },
  {
    id: "OP000015",
    accountId: "000000005",
    date: "2023-03-05",
    motif: "Paiement client",
    amount: 3500.0,
    type: "credit",
  },
  {
    id: "OP000016",
    accountId: "000000006",
    date: "2023-03-01",
    motif: "Intérêts mensuels",
    amount: 22.5,
    type: "credit",
  },
  {
    id: "OP000017",
    accountId: "000000001",
    date: "2023-02-25",
    motif: "Achat carburant",
    amount: -65.0,
    type: "debit",
  },
  {
    id: "OP000018",
    accountId: "000000002",
    date: "2023-02-20",
    motif: "Dépôt guichet",
    amount: 500.0,
    type: "credit",
  },
  {
    id: "OP000019",
    accountId: "000000003",
    date: "2023-02-15",
    motif: "Abonnement internet",
    amount: -45.0,
    type: "debit",
  },
  {
    id: "OP000020",
    accountId: "000000004",
    date: "2023-02-10",
    motif: "Versement épargne",
    amount: 1000.0,
    type: "credit",
  },
];

// Pagination des opérations
const ITEMS_PER_PAGE = 10;

export default function MifosDashboard(): ReactNode {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
        {/* Main Content */}
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6">
          <div className="md:hidden">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <BuildingIcon className="h-4 w-4" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-muted-foreground"> Comptes et Opérations</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Input
                placeholder="Rechercher..."
                className="w-[200px] sm:w-[300px] pl-8"
              />
              <div className="absolute left-2.5 top-2.5 text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="flex flex-col space-y-6">

            <Tabs defaultValue="accounts" className="w-full">
              <TabsList>
                <TabsTrigger value="accounts">Comptes</TabsTrigger>
                <TabsTrigger value="operations">Opérations</TabsTrigger>
              </TabsList>

              {/* Onglet Comptes */}
              <TabsContent value="accounts" className="space-y-4">
                <div className="flex items-center justify-between mt-4">
                  <h2 className="text-xl font-semibold">Liste des comptes</h2>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <FilterIcon className="h-4 w-4 mr-2" />
                        Filtrer
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filtrer par</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>Type de compte</DropdownMenuItem>
                        <DropdownMenuItem>Statut</DropdownMenuItem>
                        <DropdownMenuItem>Client</DropdownMenuItem>
                        <DropdownMenuItem>Produit</DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <Tabs defaultValue="all" className="w-full">
                  <TabsList>
                    <TabsTrigger value="all">Tous les comptes</TabsTrigger>
                    <TabsTrigger value="courant">Comptes courants</TabsTrigger>
                    <TabsTrigger value="epargne">Comptes d'épargne</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all" className="mt-6">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {accounts.map((account) => (
                        <MifosAccountCard key={account.id} account={account} />
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="courant" className="mt-6">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {accounts
                        .filter((account) => account.type === "courant")
                        .map((account) => (
                          <MifosAccountCard
                            key={account.id}
                            account={account}
                          />
                        ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="epargne" className="mt-6">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {accounts
                        .filter((account) => account.type === "epargne")
                        .map((account) => (
                          <MifosAccountCard
                            key={account.id}
                            account={account}
                          />
                        ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </TabsContent>

              {/* Onglet Opérations - Maintenant avec un tableau et pagination */}
              <TabsContent value="operations" className="space-y-4">
                <div className="flex items-center justify-between mt-4">
                  <h2 className="text-xl font-semibold">
                    Liste des opérations
                  </h2>
                  <div className="flex gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <FilterIcon className="h-4 w-4 mr-2" />
                          Filtrer
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filtrer par</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem>Type d'opération</DropdownMenuItem>
                          <DropdownMenuItem>Date</DropdownMenuItem>
                          <DropdownMenuItem>Compte</DropdownMenuItem>
                          <DropdownMenuItem>Montant</DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button size="sm">Nouvelle opération</Button>
                  </div>
                </div>

                {/* Tableau des opérations */}
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">ID</TableHead>
                          <TableHead className="w-[120px]">Date</TableHead>
                          <TableHead>Motif</TableHead>
                          <TableHead>Compte</TableHead>
                          <TableHead className="text-right">Montant</TableHead>
                          <TableHead className="w-[100px] text-center">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {operations
                          .slice(0, ITEMS_PER_PAGE)
                          .map((operation) => {
                            const account = accounts.find(
                              (acc) => acc.id === operation.accountId
                            );
                            return (
                              <TableRow key={operation.id}>
                                <TableCell className="font-medium">
                                  {operation.id}
                                </TableCell>
                                <TableCell>
                                  {formatDate(operation.date)}
                                </TableCell>
                                <TableCell>{operation.motif}</TableCell>
                                <TableCell>
                                  {account ? (
                                    <div className="flex flex-col">
                                      <span>{account.label}</span>
                                      <span className="text-xs text-muted-foreground">
                                        {account.id}
                                      </span>
                                    </div>
                                  ) : (
                                    "Compte inconnu"
                                  )}
                                </TableCell>
                                <TableCell className="text-right">
                                  <span
                                    className={
                                      operation.type === "credit"
                                        ? "text-green-600 font-medium"
                                        : "text-red-600 font-medium"
                                    }
                                  >
                                    {operation.type === "credit" ? "+" : ""}
                                    {formatAmount(Math.abs(operation.amount))}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <div className="flex justify-center gap-2">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-eye"
                                      >
                                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                        <circle cx="12" cy="12" r="3" />
                                      </svg>
                                      <span className="sr-only">
                                        Voir détails
                                      </span>
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </CardContent>

                  {/* Pagination numérotée */}
                  <CardFooter className="flex items-center justify-between border-t p-4">
                    <div className="text-sm text-muted-foreground">
                      Affichage de 1 à{" "}
                      {Math.min(ITEMS_PER_PAGE, operations.length)} sur{" "}
                      {operations.length} opérations
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 p-0"
                      >
                        <ChevronLeftIcon className="h-4 w-4" />
                        <span className="sr-only">Page précédente</span>
                      </Button>

                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 bg-primary text-primary-foreground"
                        >
                          1
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          2
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          3
                        </Button>
                      </div>

                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 p-0"
                      >
                        <ChevronRightIcon className="h-4 w-4" />
                        <span className="sr-only">Page suivante</span>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">Statut: À faire</Badge>
                    <Badge variant="outline">Priorité: Medium</Badge>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
  );
}

interface MifosAccountCardProps {
  account: Account;
}

function MifosAccountCard({ account }: MifosAccountCardProps): ReactNode {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR").format(date);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">{account.label}</CardTitle>
        {account.type === "courant" ? (
          <CreditCardIcon className="h-5 w-5 text-muted-foreground" />
        ) : (
          <BanknoteIcon className="h-5 w-5 text-muted-foreground" />
        )}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-2">
          <div>
            <span className="font-medium">N° Compte:</span> {account.id}
          </div>
          <div>
            <span className="font-medium">Client ID:</span> {account.clientId}
          </div>
          <div>
            <span className="font-medium">Client:</span> {account.clientName}
          </div>
          <div>
            <span className="font-medium">Produit:</span> {account.productId}
          </div>
          <div>
            <span className="font-medium">Ouvert le:</span>{" "}
            {formatDate(account.openedDate)}
          </div>
          {account.type === "epargne" && account.interestRate && (
            <div>
              <span className="font-medium">Taux:</span> {account.interestRate}%
            </div>
          )}
          {account.maturityDate && (
            <div>
              <span className="font-medium">Échéance:</span>{" "}
              {formatDate(account.maturityDate)}
            </div>
          )}
        </div>
        <div className="text-2xl font-bold">
          {new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
          }).format(account.balance)}
        </div>
        <div className="mt-3 flex gap-2">
          <Badge variant={account.type === "courant" ? "default" : "secondary"}>
            {account.type === "courant" ? "Compte courant" : "Compte d'épargne"}
          </Badge>
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            {account.status}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          Détails
        </Button>
        <Button variant="outline" size="sm">
          Transactions
        </Button>
      </CardFooter>
    </Card>
  );
}

// Fonctions utilitaires
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("fr-FR").format(date);
}

function formatAmount(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}
