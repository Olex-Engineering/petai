'use client'

import { useEffect } from "react";

export default function PetsTemplatesPage() {

    useEffect(() => {
        getTemplates();
      }, []);

      const getTemplates = async () => {
        const res = await fetch('https://ppka958fzj.execute-api.eu-central-1.amazonaws.com/dev/pet-templates', {
          headers: {
            'x-api-key': process.env.X_API_KEY || ''
          },
          method: 'GET',
        });
  
        const json = await res.json();
      }
      
    return (
        <div className="max-w-screen-lg m-auto py-5">
            <div className="py-4 mb-4">
            </div>
        </div>
    );
}