'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix Leaflet Default Icon issue in Next.js
const iconUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png';
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Province Centers (Approximate Lat/Lng)
const PROVINCE_COORDS: Record<string, [number, number]> = {
    'Buenos Aires': [-34.6037, -58.3816], // CABA/AMBA center roughly
    'Córdoba': [-31.4201, -64.1888],
    'Santa Fe': [-31.6107, -60.6973], // Santa Fe City
    'Mendoza': [-32.8895, -68.8458],
    'Tucumán': [-26.8083, -65.2176],
    'Neuquén': [-38.9516, -68.0591],
    'Chubut': [-43.3002, -65.1023], // Trelew/Madryn area
    'Río Negro': [-40.8135, -62.9967], // Viedma
    'Salta': [-24.7821, -65.4232],
    'Jujuy': [-24.1858, -65.2995],
    'Misiones': [-27.3671, -55.8961], // Posadas
    'Corrientes': [-27.4692, -58.8306],
    'Entre Ríos': [-31.7413, -60.5115], // Paraná
    'San Juan': [-31.5375, -68.5364],
    'San Luis': [-33.2950, -66.3356],
    'La Rioja': [-29.4131, -66.8558],
    'Catamarca': [-28.4696, -65.7852],
    'Santiago del Estero': [-27.7951, -64.2615],
    'Chaco': [-27.4606, -58.9839], // Resistencia
    'Formosa': [-26.1775, -58.1781],
    'La Pampa': [-36.6167, -64.2833], // Santa Rosa
    'Santa Cruz': [-51.6226, -69.2181], // Río Gallegos
    'Tierra del Fuego': [-54.8019, -68.3030], // Ushuaia
};

interface LeadMapProps {
    leads: {
        id: string;
        fullName: string;
        province?: string | null;
        stage: { name: string };
    }[];
}

export default function LeadMap({ leads }: LeadMapProps) {
    // Filter leads with valid provinces
    const markers = leads
        .filter(l => l.province && PROVINCE_COORDS[l.province])
        .map(l => ({
            ...l,
            coords: PROVINCE_COORDS[l.province!]
        }));

    // Add some random jitter to coords so they don't stack perfectly if same city?
    // For now, let's keep them stacked or add tiny offset.
    const markersWithJitter = markers.map((m, i) => ({
        ...m,
        coords: [
            m.coords[0] + (Math.random() - 0.5) * 0.01,
            m.coords[1] + (Math.random() - 0.5) * 0.01
        ] as [number, number]
    }));

    return (
        <div className="h-[400px] w-full rounded-xl overflow-hidden border border-gray-100 dark:border-zinc-800 shadow-sm z-0 relative">
            <MapContainer
                center={[-34.6037, -58.3816]}
                zoom={4}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markersWithJitter.map((lead) => (
                    <Marker key={lead.id} position={lead.coords}>
                        <Popup>
                            <div className="text-sm">
                                <strong>{lead.fullName}</strong><br />
                                {lead.province}<br />
                                <span className="text-xs text-gray-500">{lead.stage.name}</span>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
