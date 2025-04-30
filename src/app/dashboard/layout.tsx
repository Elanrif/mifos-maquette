import { BanknoteIcon, BarChart3Icon, BookIcon, BuildingIcon, CreditCardIcon, LayoutDashboardIcon, PieChartIcon, SettingsIcon, UserIcon, UsersIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 border-r bg-muted/40">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <BuildingIcon className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">kartapay</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:bg-muted"
            >
              <LayoutDashboardIcon className="h-4 w-4" />
              Tableau de bord
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all"
            >
              <CreditCardIcon className="h-4 w-4" />
              Mes comptes
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <UsersIcon className="h-4 w-4" />
              Groupes
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <CreditCardIcon className="h-4 w-4" />
              Prêts
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <BanknoteIcon className="h-4 w-4" />
              Épargne
            </Link>
            <div className="my-2 h-px bg-muted-foreground/20" />
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <BookIcon className="h-4 w-4" />
              Comptabilité
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <BarChart3Icon className="h-4 w-4" />
              Rapports
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <PieChartIcon className="h-4 w-4" />
              Analytics
            </Link>
            <div className="my-2 h-px bg-muted-foreground/20" />
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <SettingsIcon className="h-4 w-4" />
              Administration
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-4 border-t">
          <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <UserIcon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-muted-foreground">admin@kartapay.org</p>
            </div>
          </div>
        </div>
      </div>
      {children}
      </div>
  )
}
