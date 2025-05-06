
import { useState, ChangeEvent } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload, Github, Linkedin, Globe, Mail as MailIcon, Twitter } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SocialCardData } from "@/types/social-card";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  title: z.string().min(2, "Title must be at least 2 characters").optional(),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  email: z.string().email("Please enter a valid email address"),
  linkedin: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  github: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  twitter: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  portfolio: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  about: z.string().min(10, "About should be at least 10 characters").optional().or(z.literal("")),
  interests: z.string().min(10, "Interests should be at least 10 characters").optional().or(z.literal("")),
  phone: z.string().optional(),
  gradient: z.enum(['blue', 'purple', 'teal', 'orange', 'green', 'dark', 'light']).optional(),
});

type FormValues = z.infer<typeof formSchema>;

type SocialCardFormProps = {
  onUpdate: (values: SocialCardData) => void;
  initialData?: Partial<SocialCardData>;
};

export function SocialCardForm({ onUpdate, initialData = {} }: SocialCardFormProps) {
  const [photoUrl, setPhotoUrl] = useState(initialData.photoUrl || "");
  const [photoPreview, setPhotoPreview] = useState(initialData.photoUrl || "");
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData.name || "",
      title: initialData.title || "",
      website: initialData.website || "",
      email: initialData.email || "",
      linkedin: initialData.linkedin || "",
      github: initialData.github || "",
      twitter: initialData.twitter || "",
      portfolio: initialData.portfolio || "",
      about: initialData.about || "",
      interests: initialData.interests || "",
      phone: initialData.phone || "",
      gradient: initialData.gradient || "dark",
    },
  });

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPhotoPreview(result);
        setPhotoUrl(result);
        updateParent({ photoUrl: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const updateParent = (additionalData: Partial<SocialCardData> = {}) => {
    onUpdate({
      ...form.getValues(),
      photoUrl,
      ...additionalData
    } as SocialCardData);
  };

  const onSubmit = (values: FormValues) => {
    if (!photoUrl) {
      toast({
        title: "Photo required",
        description: "Please upload a profile photo",
        variant: "destructive",
      });
      return;
    }

    // Update the parent component with form values and photo
    updateParent();

    toast({
      title: "Card updated",
      description: "Your social card has been updated",
    });
  };

  // Update the parent on any field change
  const handleFieldChange = () => {
    updateParent();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Photo Upload */}
        <div className="space-y-2">
          <FormLabel>Profile Photo</FormLabel>
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-border">
              {photoPreview ? (
                <img 
                  src={photoPreview} 
                  alt="Profile preview" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <Upload className="w-8 h-8 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1">
              <Input
                type="file"
                accept="image/*"
                id="photo"
                onChange={handlePhotoChange}
                className="cursor-pointer"
              />
              <p className="text-xs text-muted-foreground mt-1">
                JPG, PNG or GIF. Max 5MB.
              </p>
            </div>
          </div>
        </div>

        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Laura Smith" 
                  {...field} 
                  onChange={(e) => {
                    field.onChange(e);
                    handleFieldChange();
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Professional Title</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Frontend Developer" 
                  {...field} 
                  onChange={(e) => {
                    field.onChange(e);
                    handleFieldChange();
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Website */}
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Personal Website</FormLabel>
              <FormControl>
                <Input 
                  placeholder="laurasmith.website" 
                  {...field} 
                  onChange={(e) => {
                    field.onChange(e);
                    handleFieldChange();
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input 
                  placeholder="laura@example.com" 
                  {...field} 
                  onChange={(e) => {
                    field.onChange(e);
                    handleFieldChange();
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Twitter - NEW FIELD */}
        <FormField
          control={form.control}
          name="twitter"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                <Twitter size={16} /> Twitter URL
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="https://twitter.com/laurasmith" 
                  {...field} 
                  onChange={(e) => {
                    field.onChange(e);
                    handleFieldChange();
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* LinkedIn */}
        <FormField
          control={form.control}
          name="linkedin"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                <Linkedin size={16} /> LinkedIn URL
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="https://linkedin.com/in/laurasmith" 
                  {...field} 
                  onChange={(e) => {
                    field.onChange(e);
                    handleFieldChange();
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* GitHub */}
        <FormField
          control={form.control}
          name="github"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                <Github size={16} /> GitHub URL
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="https://github.com/laurasmith" 
                  {...field} 
                  onChange={(e) => {
                    field.onChange(e);
                    handleFieldChange();
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Portfolio */}
        <FormField
          control={form.control}
          name="portfolio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                <Globe size={16} /> Portfolio URL
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="https://portfolio.laurasmith.website" 
                  {...field} 
                  onChange={(e) => {
                    field.onChange(e);
                    handleFieldChange();
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* About */}
        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="I am a frontend developer with a particular interest in making things simple and automating daily tasks..."
                  {...field} 
                  onChange={(e) => {
                    field.onChange(e);
                    handleFieldChange();
                  }}
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Interests */}
        <FormField
          control={form.control}
          name="interests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interests</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Food expert. Music scholar. Reader. Internet fanatic. Bacon buff. Entrepreneur. Travel geek. Pop culture ninja. Coffee fanatic."
                  {...field} 
                  onChange={(e) => {
                    field.onChange(e);
                    handleFieldChange();
                  }}
                  rows={3}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Gradient Selector */}
        <FormField
          control={form.control}
          name="gradient"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card Style</FormLabel>
              <div className="grid grid-cols-4 gap-2">
                <Button
                  type="button"
                  variant={field.value === 'dark' ? 'default' : 'outline'}
                  className="bg-gradient-to-b from-gray-900 to-gray-800 text-white border-2"
                  onClick={() => {
                    field.onChange('dark');
                    handleFieldChange();
                  }}
                >
                  Dark
                </Button>
                <Button
                  type="button"
                  variant={field.value === 'light' ? 'default' : 'outline'}
                  className="bg-gradient-to-b from-gray-100 to-white text-gray-800 border-2"
                  onClick={() => {
                    field.onChange('light');
                    handleFieldChange();
                  }}
                >
                  Light
                </Button>
                <Button
                  type="button"
                  variant={field.value === 'blue' ? 'default' : 'outline'}
                  className="bg-gradient-to-b from-blue-500 to-blue-700 text-white border-2"
                  onClick={() => {
                    field.onChange('blue');
                    handleFieldChange();
                  }}
                >
                  Blue
                </Button>
                <Button
                  type="button"
                  variant={field.value === 'purple' ? 'default' : 'outline'}
                  className="bg-gradient-to-b from-purple-500 to-purple-700 text-white border-2"
                  onClick={() => {
                    field.onChange('purple');
                    handleFieldChange();
                  }}
                >
                  Purple
                </Button>
                <Button
                  type="button"
                  variant={field.value === 'teal' ? 'default' : 'outline'}
                  className="bg-gradient-to-b from-teal-500 to-teal-700 text-white border-2"
                  onClick={() => {
                    field.onChange('teal');
                    handleFieldChange();
                  }}
                >
                  Teal
                </Button>
                <Button
                  type="button"
                  variant={field.value === 'orange' ? 'default' : 'outline'}
                  className="bg-gradient-to-b from-orange-400 to-orange-600 text-white border-2"
                  onClick={() => {
                    field.onChange('orange');
                    handleFieldChange();
                  }}
                >
                  Orange
                </Button>
                <Button
                  type="button"
                  variant={field.value === 'green' ? 'default' : 'outline'}
                  className="bg-gradient-to-b from-green-500 to-green-700 text-white border-2"
                  onClick={() => {
                    field.onChange('green');
                    handleFieldChange();
                  }}
                >
                  Green
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Save Card</Button>
      </form>
    </Form>
  );
}
