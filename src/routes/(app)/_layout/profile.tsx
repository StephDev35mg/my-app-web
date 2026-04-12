import { useEffect, useMemo, useState } from 'react'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import type { RootState } from '@/redux/store'
import { logout } from '@/redux/slices/client.slice'
import { useLogoutClient } from '@/api/auth/logout.client.api'
import { useDeleteAccount } from '@/api/auth/delete.account.api'

export const Route = createFileRoute('/(app)/_layout/profile')({
  component: Profile,
})

function Profile() {
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.client.user)

  const {
    mutate: logoutMutation,
    isSuccess: isLogoutSuccess,
    isPending: isLoggingOut,
  } = useLogoutClient()

  const { mutateAsync: deleteAccount, isPending: isDeleting } =
    useDeleteAccount()

  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)

  const avatarPreviewUrl = useMemo(() => {
    if (!avatarFile) return null
    return URL.createObjectURL(avatarFile)
  }, [avatarFile])

  useEffect(() => {
    return () => {
      if (avatarPreviewUrl) URL.revokeObjectURL(avatarPreviewUrl)
    }
  }, [avatarPreviewUrl])

  useEffect(() => {
    if (!isLogoutSuccess) return
    dispatch(logout())
    toast.success('Déconnexion réussie')
  }, [isLogoutSuccess, dispatch])

  const handleLogout = () => {
    logoutMutation()
    setLogoutDialogOpen(false)
  }
  const handleDelete = async () => {
    if (!password) {
      toast.error('Mot de passe requis')
      return
    }
    if (password !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas')
      return
    }

    const ok = window.confirm(
      'Voulez-vous vraiment supprimer votre compte ? Cette action est irréversible.',
    )
    if (!ok) return

    try {
      await deleteAccount({ password })
      dispatch(logout())
      toast.success('Compte supprimé')
      router.navigate({ to: '/', replace: true })
    } catch {
      toast.error('Suppression échouée')
    }
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-start justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-semibold'>Profile</h1>
          <p className='text-sm text-muted-foreground'>Gérez votre compte</p>
        </div>

        <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
          <DialogTrigger>
            <Button
              variant='destructive'
              className='shrink-0'
              disabled={isLoggingOut}
            >
              {isLoggingOut ? 'Déconnexion...' : 'Se déconnecter'}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmer la déconnexion</DialogTitle>
              <DialogDescription>
                Êtes-vous sûr de vouloir vous déconnecter ?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant='outline'
                onClick={() => setLogoutDialogOpen(false)}
                disabled={isLoggingOut}
              >
                Annuler
              </Button>
              <Button
                variant='destructive'
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? 'Déconnexion...' : 'Se déconnecter'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations</CardTitle>
          <CardDescription>Vos informations de base</CardDescription>
        </CardHeader>
        <CardContent className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='rounded-lg border p-4'>
            <p className='text-xs text-muted-foreground'>ID</p>
            <p className='text-lg font-medium'>{user?.id ?? '—'}</p>
          </div>
          <div className='rounded-lg border p-4'>
            <p className='text-xs text-muted-foreground'>Email</p>
            <p className='text-lg font-medium break-all'>
              {user?.email ?? '—'}
            </p>
          </div>
          <div className='rounded-lg border p-4 sm:col-span-2'>
            <p className='text-xs text-muted-foreground'>Username</p>
            <p className='text-lg font-medium'>{user?.username ?? '—'}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Photo</CardTitle>
          <CardDescription>Ajouter une image (preview local)</CardDescription>
        </CardHeader>
        <CardContent className='flex items-center gap-4'>
          <div className='h-16 w-16 overflow-hidden rounded-full border bg-muted'>
            {avatarPreviewUrl ? (
              <img
                src={avatarPreviewUrl}
                alt='Avatar'
                className='h-full w-full object-cover'
              />
            ) : (
              <div className='h-full w-full grid place-items-center text-xs text-muted-foreground'>
                Image
              </div>
            )}
          </div>

          <div className='flex flex-col gap-2'>
            <Input
              type='file'
              accept='image/*'
              onChange={(e) => setAvatarFile(e.target.files?.[0] ?? null)}
            />
            <p className='text-xs text-muted-foreground'>
              (Backend upload non implémenté)
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className='border-destructive/40'>
        <CardHeader>
          <CardTitle className='text-destructive'>
            Supprimer le compte
          </CardTitle>
          <CardDescription>
            Confirmez votre mot de passe pour continuer
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-3'>
          <Input
            type='password'
            placeholder='Mot de passe'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type='password'
            placeholder='Confirmer le mot de passe'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            variant='destructive'
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Suppression...' : 'Supprimer mon compte'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
