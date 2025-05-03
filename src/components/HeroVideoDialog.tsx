
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Play } from "lucide-react";

export function HeroVideoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="gap-2 my-4">
          <Play className="h-4 w-4" /> View Demo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>See NexCard in action</DialogTitle>
          <DialogDescription>
            Watch how easily you can create and share your professional digital card
          </DialogDescription>
        </DialogHeader>
        <div className="aspect-video bg-muted rounded-md overflow-hidden">
          <video
            className="w-full h-full"
            controls
            poster="/placeholder.svg"
          >
            <source src="/demo-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </DialogContent>
    </Dialog>
  );
}
