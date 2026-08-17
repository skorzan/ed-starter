import { NextResponse } from 'next/server';
import { readFlights } from '@/lib/flights';
import { ALL_STATUSES, type FlightStatus } from '@/types';

// GET /api/flights/stats — count of flights per status
export async function GET() {
  const flights = readFlights();

  const counts = ALL_STATUSES.reduce(
    (acc, status) => {
      acc[status] = 0;
      return acc;
    },
    {} as Record<FlightStatus, number>
  );

  for (const flight of flights) {
    counts[flight.status] += 1;
  }

  return NextResponse.json(counts);
}
