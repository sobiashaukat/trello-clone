"use client";
import { useEffect, useState } from "react";
import { unsplash } from "@/lib/unsplash";
import {Loader2} from 'lucide-react';

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

export const FormPicker = ({ id, errors }: FormPickerProps) => {
  const [images, setImages] = useState<Array<Record<string, any>>>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });

        if (result && result.response) {
          const newImages = result.response as Array<Record<string, any>>;
          setImages(newImages);
        } else {
          console.error("Failed to get images from Unsplash");
        }
      } catch (error) {
        console.log(error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };
  }, []);
  if (isLoading) {
    return (
      <div>
        <Loader2  className="h-6 w-6 text-sky-700 animate-bounce"/>
      </div>
    )
  }

  return <div>Form Picker!</div>;
};
