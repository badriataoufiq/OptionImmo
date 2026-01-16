import { useEffect, useRef, useState } from 'react';
import { loadGoogleMapsScript } from '../utils/loadGoogleMaps';

interface UseGooglePlacesAutocompleteProps {
  onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
}

export const useGooglePlacesAutocomplete = ({
  onPlaceSelected,
}: UseGooglePlacesAutocompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initAutocomplete = async () => {
      try {
        await loadGoogleMapsScript();
        setIsReady(true);
      } catch (error) {
        console.error('Failed to load Google Maps:', error);
      }
    };

    initAutocomplete();
  }, []);

  useEffect(() => {
    if (!inputRef.current || !isReady || !window.google) return;

    try {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ['address'],
          fields: ['formatted_address', 'address_components', 'geometry', 'name'],
          componentRestrictions: { country: 'BE' },
        }
      );

      const listener = autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current?.getPlace();
        if (place) {
          onPlaceSelected(place);
        }
      });

      return () => {
        if (listener) {
          window.google.maps.event.removeListener(listener);
        }
      };
    } catch (error) {
      console.error('Failed to initialize Google Places Autocomplete:', error);
    }
  }, [onPlaceSelected, isReady]);

  return inputRef;
};
