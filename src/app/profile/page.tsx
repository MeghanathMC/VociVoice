
"use client";

import { useRef, useState } from "react";
import { useProfileStore } from "@/hooks/use-profile-store";
import { nativeLanguages } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Camera } from "lucide-react";

export default function ProfilePage() {
  const { name, nativeLanguage, profileImageSrc, setName, setNativeLanguage, setProfileImageSrc } = useProfileStore();
  const [currentName, setCurrentName] = useState(name);
  const [currentLanguage, setCurrentLanguage] = useState(nativeLanguage);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getInitials = (name: string) => {
    if (!name) return "";
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setName(currentName);
    setNativeLanguage(currentLanguage);
    toast({
      title: "Profile Updated",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <div className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
          Your Profile
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Personalize your learning experience.
        </p>
      </header>
      
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>Manage your public profile and language settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profileImageSrc || ""} alt={`@${name}`} />
                <AvatarFallback className="text-3xl">{getInitials(name)}</AvatarFallback>
              </Avatar>
              <Button 
                variant="outline"
                size="icon"
                className="absolute bottom-0 right-0 rounded-full"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="h-4 w-4" />
              </Button>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={handleImageChange}
                accept="image/png, image/jpeg"
              />
            </div>
            <div className="flex-1">
                <h3 className="text-xl font-semibold">{name}</h3>
                <p className="text-sm text-muted-foreground">Native Language: {nativeLanguages.find(l => l.value === nativeLanguage)?.label || nativeLanguage}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Display Name</Label>
            <Input 
              id="name" 
              value={currentName} 
              onChange={(e) => setCurrentName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="native-language">Native Language</Label>
            <Select value={currentLanguage} onValueChange={setCurrentLanguage}>
              <SelectTrigger id="native-language">
                <SelectValue placeholder="Select your native language" />
              </SelectTrigger>
              <SelectContent>
                {nativeLanguages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
