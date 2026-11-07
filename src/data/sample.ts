import type { Traveller, Trip } from "./types";

/**
 * The demo persona and trip. One coherent story makes feedback sessions easier:
 * testers react to "Margaret's trip" instead of an abstract app.
 * TODO(Ronnie): adjust the persona to match the people you'll test with.
 */
export const TRAVELLER: Traveller = {
  name: "Margaret",
  age: 74,
  homeCity: "Manchester",
  companions: ["David (husband, 78)"],
  needs: [
    { icon: "walking", label: "Short walks only", detail: "Knee pain after ~15 minutes. Uses a cane." },
    { icon: "medication", label: "Insulin", detail: "Needs a fridge in the room and meals on time." },
    { icon: "hearing", label: "Hearing aid", detail: "Prefers text over phone calls." },
    { icon: "pace", label: "Relaxed pace", detail: "One main activity per day, rest after lunch." },
  ],
  family: [
    { name: "Sarah", relation: "Daughter", phone: "+44 7700 900123", canSeeTrip: true, canSeeLocation: true },
    { name: "Tom", relation: "Son", phone: "+44 7700 900456", canSeeTrip: true, canSeeLocation: false },
  ],
};

export const TRIP: Trip = {
  destination: "Lisbon",
  country: "Portugal",
  dates: "12 – 17 May",
  hotel: {
    name: "Hotel Avenida Palace",
    address: "Rua 1º de Dezembro 123, Lisbon",
    localAddress: "Por favor, leve-me ao Hotel Avenida Palace, Rua 1º de Dezembro 123.",
    phone: "+351 21 000 0000",
  },
  days: [
    {
      date: "Mon 12 May",
      title: "Arrival",
      items: [
        {
          time: "11:40",
          title: "Land at Lisbon Airport",
          kind: "travel",
          accessNote: "Wheelchair assistance booked from the plane door to the taxi.",
        },
        {
          time: "13:00",
          title: "Taxi to hotel (25 min)",
          kind: "travel",
          accessNote: "Pre-booked, driver waits at Arrivals with a sign.",
        },
        { time: "14:00", title: "Lunch & rest at the hotel", kind: "rest" },
        { time: "18:30", title: "Insulin reminder", kind: "medication" },
      ],
    },
    {
      date: "Tue 13 May",
      title: "Belém by the river",
      items: [
        {
          time: "10:00",
          title: "Jerónimos Monastery",
          kind: "activity",
          accessNote: "Flat, step-free route. Benches every 50 m. Skip-the-line tickets.",
          directions: [
            "Leave the hotel by the main door.",
            "Your taxi is waiting outside (blue car, plate AB-12-CD).",
            "The ride takes about 20 minutes.",
            "The driver drops you at the side entrance — it has no steps.",
          ],
        },
        {
          time: "12:30",
          title: "Lunch at Pastéis de Belém",
          kind: "meal",
          accessNote: "Table reserved near the entrance. Sugar-free options available.",
        },
        { time: "14:00", title: "Rest at the hotel", kind: "rest" },
      ],
    },
  ],
};
