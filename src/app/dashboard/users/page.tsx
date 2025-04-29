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
  ArrowDownIcon,
  ArrowUpIcon,
  CalendarIcon,
} from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Définition des types
interface Account {
  id: string
  clientId: string
  clientName: string
  label: string
  balance: number
  type: "courant" | "epargne"
  status: "actif" | "inactif" | "fermé"
  openedDate: string
  productId: string
  interestRate?: number
  maturityDate?: string
}

interface Operation {
  id: string
  accountId: string
  date: string
  motif: string
  amount: number
  type: "credit" | "debit"
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
]

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
]

export default function MifosDashboard() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
    <main className="flex-1 overflow-auto p-6">
        <div className="flex flex-col space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                    <UserIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                    <p className="text-sm font-medium leading-none">Total Clients</p>
                    <p className="text-2xl font-bold">3</p>
                    </div>
                </div>
                </div>
            </CardContent>
            </Card>
            <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                    <CreditCardIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                    <p className="text-sm font-medium leading-none">Comptes Courants</p>
                    <p className="text-2xl font-bold">3</p>
                    </div>
                </div>
                </div>
            </CardContent>
            </Card>
            <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                    <BanknoteIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                    <p className="text-sm font-medium leading-none">Comptes Épargne</p>
                    <p className="text-2xl font-bold">3</p>
                    </div>
                </div>
                </div>
            </CardContent>
            </Card>
            <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                    <UsersIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                    <p className="text-sm font-medium leading-none">Groupes</p>
                    <p className="text-2xl font-bold">0</p>
                    </div>
                </div>
                </div>
            </CardContent>
            </Card>
        </div>

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
                        <MifosAccountCard key={account.id} account={account} />
                    ))}
                </div>
                </TabsContent>
                <TabsContent value="epargne" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {accounts
                    .filter((account) => account.type === "epargne")
                    .map((account) => (
                        <MifosAccountCard key={account.id} account={account} />
                    ))}
                </div>
                </TabsContent>
            </Tabs>
            </TabsContent>

            {/* Onglet Opérations */}
            <TabsContent value="operations" className="space-y-4">
            <div className="flex items-center justify-between mt-4">
                <h2 className="text-xl font-semibold">Liste des opérations</h2>
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

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {operations.map((operation) => (
                <OperationCard
                    key={operation.id}
                    operation={operation}
                    account={accounts.find((acc) => acc.id === operation.accountId)}
                />
                ))}
            </div>

            <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">Affichage de {operations.length} opérations</p>
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
  )
}

interface MifosAccountCardProps {
  account: Account
}

function UserAccountCard({ account }: MifosAccountCardProps) {
 
    return(
        <div>
            
        </div>
    )
  }

function MifosAccountCard({ account }: MifosAccountCardProps): ReactNode {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR").format(date)
  }

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
            <span className="font-medium">Ouvert le:</span> {formatDate(account.openedDate)}
          </div>
          {account.type === "epargne" && account.interestRate && (
            <div>
              <span className="font-medium">Taux:</span> {account.interestRate}%
            </div>
          )}
          {account.maturityDate && (
            <div>
              <span className="font-medium">Échéance:</span> {formatDate(account.maturityDate)}
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
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
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
  )
}

interface OperationCardProps {
  operation: Operation
  account: Account | undefined
}

function OperationCard({ operation, account }: OperationCardProps): ReactNode {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR").format(date)
  }

  const formatAmount = (amount: number): string => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(amount)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-base font-medium">{operation.motif}</CardTitle>
          <p className="text-xs text-muted-foreground">
            {account ? `${account.label} (${account.id})` : "Compte inconnu"}
          </p>
        </div>
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full ${
            operation.type === "credit" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {operation.type === "credit" ? <ArrowDownIcon className="h-4 w-4" /> : <ArrowUpIcon className="h-4 w-4" />}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <CalendarIcon className="h-4 w-4" />
          <span>{formatDate(operation.date)}</span>
        </div>
        <div className={`text-xl font-bold ${operation.type === "credit" ? "text-green-600" : "text-red-600"}`}>
          {operation.type === "credit" ? "+" : ""}
          {formatAmount(Math.abs(operation.amount))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          Détails
        </Button>
        <Button variant="ghost" size="sm">
          Imprimer
        </Button>
      </CardFooter>
    </Card>
  )
}
