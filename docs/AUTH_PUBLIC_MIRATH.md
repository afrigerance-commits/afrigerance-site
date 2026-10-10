# Inscription publique — préparation du 9 octobre 2026

Statut : corrections locales uniquement, pas de publication ni de modification des réglages Supabase.

Le site propose une inscription e-mail/mot de passe à tous les lecteurs. Les rôles d’administration restent contrôlés par les politiques et rôles existants ; aucun rôle n’est accepté depuis le formulaire ou les métadonnées.

## Corrections

- Une inscription sans session affiche les instructions de confirmation et n’insère pas de profil sans authentification.
- Une session valide initialise le profil sans écraser un profil existant.
- `/auth/callback` échange le code PKCE ; `/auth/confirm` valide le token du modèle SSR. Les jetons sont supprimés de la destination finale.
- Les liens invalides ou expirés donnent un message et la connexion propose de renvoyer la confirmation.
- Les destinations externes après connexion sont refusées. Les messages ne révèlent pas si un compte existe lors de l’inscription ou du renvoi.

## Réglages à vérifier dans le projet Supabase avant ouverture publique

1. Activer le fournisseur e-mail et les nouvelles inscriptions ; conserver la confirmation d’adresse.
2. Configurer un SMTP personnalisé autorisant les destinataires publics. Le SMTP intégré Supabase est réservé aux adresses de l’équipe : la présence des variables Supabase dans Netlify ne garantit donc pas l’inscription de tous les visiteurs.
3. Définir Site URL à `https://miraath.netlify.app` et autoriser `https://miraath.netlify.app/auth/callback` dans Redirect URLs.
4. Définir `NEXT_PUBLIC_SITE_URL=https://miraath.netlify.app` dans Netlify (sans espace final).
5. Pour permettre d’ouvrir la confirmation sur un autre appareil, préférer le modèle SSR ci-dessous. Le callback PKCE reste pris en charge pour le modèle standard, dans le navigateur qui a commencé l’inscription.

Modèle « Confirm signup » proposé, à appliquer seulement avec la mise en ligne des routes :

```html
<h2>Confirmez votre compte MIRÂTH</h2>
<p>Pour activer votre compte, cliquez sur ce lien :</p>
<p><a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email">Confirmer mon adresse e-mail</a></p>
<p>Si vous n’avez pas demandé cette inscription, ignorez ce message.</p>
```

Vérifier que la migration `0002_rls.sql` est effectivement appliquée (profil propre, données personnelles et accès administrateur). Aucun réglage de production n’a été changé pendant cette préparation.

## Validation réelle restant à effectuer

Après publication autorisée et vérification SMTP, utiliser une adresse de test appartenant à l’utilisateur : inscription, réception réelle, ouverture du lien (également sur un autre appareil avec le modèle SSR), accès au compte, déconnexion et reconnexion. Vérifier qu’un lecteur ordinaire n’accède pas à `/admin`, que les favoris/progressions restent isolés et qu’un lien déjà utilisé affiche une explication. Ne pas transmettre de mot de passe ni de jeton dans le chat.

Les tests automatisés simulent Supabase : ils vérifient le comportement du code, pas la réception des messages ou les politiques effectives de la base distante.

Sources officielles :
- https://supabase.com/docs/guides/auth/passwords
- https://supabase.com/docs/guides/auth/auth-smtp
- https://supabase.com/docs/guides/auth/auth-email-templates
- https://supabase.com/docs/guides/auth/sessions/pkce-flow
- https://supabase.com/docs/reference/javascript/auth-resend

## Vérifications exécutées

- `npm test` : 22 fichiers, 80 tests réussis, dont 21 cas supplémentaires pour l’authentification.
- `npm run build -- --webpack` : compilation de production réussie, routes de confirmation présentes.
- `npx tsc --noEmit` : réussi.
- ESLint sur tous les fichiers de code modifiés et ajoutés : réussi.
- Site public : `/compte` renvoie un visiteur anonyme vers `/connexion?redirect=%2Fcompte`.
- Aucune inscription distante ni aucun envoi d’e-mail n’a été effectué. Les paramètres SMTP, inscriptions autorisées et RLS distants ne sont pas encore vérifiés.
