"use client";
import { useState, useEffect } from "react";
import { getIcebreaker } from "../services/icebreaker";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerTrigger,
  DrawerClose,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

export default function Icebreaker() {
  const [icebreakers, setIcebreakers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const fetchIcebreakers = async () => {
    setLoading(true);
    setError(null);
    try {
      const icebreakerData = await getIcebreaker();
      setIcebreakers(icebreakerData.iceBreakers);
    } catch (err) {
      console.error("Could not fetch icebreaker:", err);
      setError("Could not fetch icebreaker");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const id = requestAnimationFrame(() => {
      const el = document.querySelector('[data-testid="icebreaker-component"]');
      el?.focus();
    });
    return () => cancelAnimationFrame(id);
  }, [isOpen]);

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (open) fetchIcebreakers();
      }}
    >
      <DrawerTrigger asChild>
        <Button 
          variant="outline" 
          data-testid="icebreaker-reveal-button"
          aria-expanded={isOpen} 
          aria-controls="icebreaker-component"
          >
          {isOpen ? "Hide the icebreakers" : "Show me the icebreakers!"}{" "}
          <span aria-hidden="true">🧊</span>
        </Button>
      </DrawerTrigger>
        
        <DrawerPortal>
          <DrawerOverlay />
            <DrawerContent 
              data-testid="icebreaker-component"
              tabIndex={-1}
              className="bg-background text-foreground flex h-auto flex-col rounded-t-[10px]"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <div className="mx-auto w-full max-w-sm overflow-y-auto pb-34 md:pb-24">

                <div className="p-4 flex flex-col items-center justify-center min-h-50">
                  {loading && (
                    // Co-located with the revealed list below; mirrors its shell — the same
                    // top margin and centered column the real `.icebreakerText` lines render in.
                    <div className="space-y-3" aria-busy="true" data-testid="icebreaker-skeleton">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                      <Skeleton className="h-4 w-4/6" />
                    </div>
                  )}

                {error && (
                  <p className="text-destructive text-center p-4" data-testid="icebreaker-error">
                    {error}
                  </p>
                )}

                {!loading && icebreakers.length > 0 && (

                  <ul className="space-y-4" data-testid="icebreaker-list">
                    {icebreakers.map((item, index) => (
                      <li 
                        key={item._id} 
                        className="text-base font-normal"
                        tabIndex={-1}
                        ref={(node) => {
                          if (index === 0 && node) {
                            node.focus();
                          }
                        }}
                      >
                        {item.icebreaker}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <DrawerFooter >
                <DrawerClose asChild>
                  <Button 
                    variant="outline" 
                    aria-label="hide-icebreakers-button">Hide the icebreakers 
                    <span aria-hidden="true">🧊</span>
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </div>  
          </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
}
