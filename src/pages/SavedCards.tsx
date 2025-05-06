
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { CreditCard, Eye, Pencil, Trash } from "lucide-react";

// Type for card data from database
interface SavedCard {
  id: string;
  name: string;
  title: string | null;
  email: string | null;
  template_id: string;
  created_at: string;
  gradient: string | null;
}

const SavedCards = () => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const [cards, setCards] = useState<SavedCard[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserCards();
    }
  }, [isAuthenticated, user]);
  
  const fetchUserCards = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cards')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      setCards(data || []);
    } catch (error) {
      console.error('Error fetching cards:', error);
      toast({
        title: "Failed to load cards",
        description: "There was an error loading your saved cards.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteCard = async (id: string) => {
    try {
      const { error } = await supabase
        .from('cards')
        .delete()
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      // Remove the deleted card from state
      setCards(cards.filter(card => card.id !== id));
      
      toast({
        title: "Card deleted",
        description: "Your card has been deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting card:', error);
      toast({
        title: "Failed to delete card",
        description: "There was an error deleting your card.",
        variant: "destructive",
      });
    }
  };
  
  // Show loading state
  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-background/90">
        <Header />
        <main className="flex-grow pt-24 md:pt-32 pb-16 md:pb-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-background/90">
      <Header />
      <main className="flex-grow pt-24 md:pt-32 pb-16 md:pb-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-8 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-foreground">Your Saved Cards</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              View and manage all your saved social cards
            </p>
          </motion.div>
          
          {cards.length === 0 ? (
            <div className="text-center py-12">
              <CreditCard className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">No cards found</h2>
              <p className="text-muted-foreground mb-6">You haven't created any cards yet.</p>
              <Button asChild>
                <Link to="/create">Create Your First Card</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cards.map(card => (
                <Card key={card.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle>{card.name}</CardTitle>
                    <CardDescription>{card.title || "No title"}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className={`aspect-video rounded-md bg-gradient-to-br ${
                      card.gradient === 'dark' ? 'from-gray-900 to-gray-800' :
                      card.gradient === 'light' ? 'from-gray-100 to-white' :
                      card.gradient === 'blue' ? 'from-blue-500 to-blue-700' :
                      card.gradient === 'purple' ? 'from-purple-500 to-purple-700' :
                      card.gradient === 'teal' ? 'from-teal-500 to-teal-700' :
                      card.gradient === 'orange' ? 'from-orange-400 to-orange-600' :
                      card.gradient === 'green' ? 'from-green-500 to-green-700' :
                      'from-gray-500 to-gray-700'
                    } flex items-center justify-center`}>
                      <CreditCard className={`w-12 h-12 ${card.gradient === 'light' ? 'text-gray-800' : 'text-white'}`} />
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground">Template: {card.template_id}</p>
                      <p className="text-sm text-muted-foreground">{new Date(card.created_at).toLocaleDateString()}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon" asChild>
                        <Link to={`/view/${card.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <Link to={`/edit/${card.id}`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      onClick={() => handleDeleteCard(card.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              <Card className="border-dashed border-2 hover:border-primary hover:shadow-md transition-all flex flex-col items-center justify-center py-8">
                <CreditCard className="w-12 h-12 text-muted-foreground mb-4" />
                <CardTitle className="text-muted-foreground">Create New Card</CardTitle>
                <Link to="/create">
                  <Button className="mt-4">Get Started</Button>
                </Link>
              </Card>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SavedCards;
