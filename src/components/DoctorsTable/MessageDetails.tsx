'use client';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button";
import { _Message } from "@/types/optimalscript";

export default function ContactFormMessage({data}:{data: _Message}){
    return( <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Show Message</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
               Sender: {data.name}
            </AlertDialogTitle>
            <AlertDialogTitle>
               Email: {data.email}
            </AlertDialogTitle>
            <AlertDialogTitle>
                Date {new Date(data.created_at).toISOString().replace('.000Z','').split('T').join(' ')}
            </AlertDialogTitle>
            <AlertDialogDescription>
                {data.message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>);
};