'use client';
import { signInGithub, signInGoogle } from '@/actions/auth/sign-in';
import { useAuthModal } from '@/hooks/useAuthModal';
import { Github, LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui';

const AuthModal = () => {
  const { isOpen, toggle } = useAuthModal();
  const [loading, setLoading] = useState<'github' | 'google' | null>(null);

  const handleSignIn = async (provider: 'github' | 'google') => {
    try {
      setLoading(provider);
      if (provider === 'github') {
        await signInGithub();
      } else {
        await signInGoogle();
      }
    } catch (_error) {
      toast.error('Failed to sign in');
    } finally {
      setLoading(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden border border-zinc-200 dark:border-white/10 bg-white dark:bg-black">
        <div className="px-6 py-8">
          <DialogHeader className="pb-6">
            <DialogTitle className="text-xl font-medium text-zinc-900 dark:text-white">
              Sign in to continue
            </DialogTitle>
            <DialogDescription className="text-sm text-zinc-500 dark:text-gray-400">
              Generate beautiful UI components in seconds
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <Button
              className="w-full h-11 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-900 transition-colors"
              onClick={() => handleSignIn('github')}
              disabled={loading !== null}
            >
              {loading === 'github' ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Github className="h-4 w-4" />
                  <span>Continue with GitHub</span>
                </div>
              )}
            </Button>

            <Button
              className="w-full h-11 bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-white dark:border-zinc-700 transition-colors"
              onClick={() => handleSignIn('google')}
              disabled={loading !== null}
            >
              {loading === 'google' ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    role="img"
                    aria-label="Google logo"
                  >
                    <title>Google</title>
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </div>
              )}
            </Button>
          </div>

          <p className="mt-4 text-xs text-center text-zinc-500 dark:text-gray-500">
            A free and open source UI component generator.{' '}
            <span className="text-zinc-700 dark:text-gray-400">
              Built with shadcn/ui and Next.js
            </span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
