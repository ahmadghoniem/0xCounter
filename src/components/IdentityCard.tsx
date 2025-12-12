import { Card, CardContent } from "@/components/ui/card";
import { useEnsProfile } from "@/hooks/useEnsProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function IdentityCard() {
  const { ensName, ensAvatar, ensBanner, address } = useEnsProfile();

  if (!address) {
    return null;
  }

  const displayName =
    ensName || `${address.slice(0, 6)}...${address.slice(-4)}`;
  const fallbackInitial = ensName
    ? ensName[0].toUpperCase()
    : address[2].toUpperCase();

  return (
    <Card className="min-w-2xs overflow-hidden">
      {/* Banner */}
      <div className="h-20 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 relative">
        {ensBanner && (
          <img
            src={ensBanner}
            alt="Profile banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>

      {/* Profile Section */}
      <CardContent className="relative pt-0 pb-4 px-4">
        {/* Avatar */}
        <div className="absolute -top-10 left-4">
          <Avatar className="h-20 w-20 border-4 border-card">
            <AvatarImage src={ensAvatar || undefined} alt={displayName} />
            <AvatarFallback className="text-2xl font-semibold">
              {fallbackInitial}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Name and Address */}
        <div className="pt-12">
          <h3 className="font-bold text-lg truncate">{displayName}</h3>
          {ensName && (
            <p className="text-sm text-muted-foreground font-mono truncate">
              {address.slice(0, 6)}...{address.slice(-4)}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
