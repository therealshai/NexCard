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
import { Upload, Linkedin, Globe, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SocialCardData } from "@/types/social-card";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  title: z.string().min(2, "Title must be at least 2 characters"),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  email: z.string().email("Please enter a valid email address"),
  linkedin: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  github: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  portfolio: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  about: z.string().min(10, "About should be at least 10 characters"),
  interests: z.string().min(10, "Interests should be at least 10 characters"),
  phone: z.string().optional(),
  techSkills: z.string().min(5, "Tech skills should be at least 5 characters").optional(),
  publishedWorks: z.string().min(5, "Published works should be at least 5 characters").optional(),
  latestWorkLinks: z.string().min(5, "Latest work links should be at least 5 characters").optional(),
  gradient: z.enum(['blue', 'purple', 'teal', 'orange', 'green']).optional(),
});

type FormValues = z.infer<typeof formSchema>;

type SocialCardFormProps = {
  onUpdate: (values: SocialCardData) => void;
  initialData?: Partial<SocialCardData>;
  template?: string;
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
      portfolio: initialData.portfolio || "",
      about: initialData.about || "",
      interests: initialData.interests || "",
      phone: initialData.phone || "",
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
    });
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

    updateParent();
    toast({
      title: "Card updated",
      description: "Your social card has been updated",
    });
  };

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

        {/* LinkedIn */}
        <FormField
          control={form.control}
          name="linkedin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn URL</FormLabel>
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
              <FormLabel>GitHub URL</FormLabel>
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
              <FormLabel>Portfolio URL</FormLabel>
              <FormControl>
                <Input 
                  placeholder="https://laurasmith-portfolio.com" 
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

        {/* Phone (Optional) */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number (Optional)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="+1 (555) 123-4567" 
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
        {/* Tech Skills */}
<FormField
  control={form.control}
  name="techSkills"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Technical Skills</FormLabel>
      <FormControl>
        <Textarea 
          placeholder="React, Python, Machine Learning, Data Analysis..."
          {...field} 
          onChange={(e) => {
            field.onChange(e);
            handleFieldChange();
          }}
          rows={2}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

{/* Published Works */}
<FormField
  control={form.control}
  name="publishedWorks"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Published Works</FormLabel>
      <FormControl>
        <Textarea 
          placeholder="1. 'Deep Learning Approaches to NLP' - Journal of AI Research, 2023..."
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

{/* Latest Work Links */}
<FormField
  control={form.control}
  name="latestWorkLinks"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Latest Work Links</FormLabel>
      <FormControl>
        <Textarea 
          placeholder="https://arxiv.org/your-paper\nhttps://github.com/your-project..."
          {...field} 
          onChange={(e) => {
            field.onChange(e);
            handleFieldChange();
          }}
          rows={2}
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
      <FormLabel>Card Gradient</FormLabel>
      <FormControl>
        <div className="flex gap-2">
          {['blue', 'purple', 'teal', 'orange', 'green'].map((color) => (
            <button
              type="button"
              key={color}
              className={`w-8 h-8 rounded-full bg-gradient-to-br from-${color}-400 to-${color}-600 border-2 ${field.value === color ? 'border-black' : 'border-transparent'}`}
              onClick={() => {
                field.onChange(color);
                handleFieldChange();
              }}
              title={color.charAt(0).toUpperCase() + color.slice(1)}
            />
          ))}
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
          {/* Tech Skills (Optional) */}  
        <Button type="submit" className="w-full">Save Card</Button>
      </form>
    </Form>
  );
}