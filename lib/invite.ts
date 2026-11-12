/** Event facts from the wedding cards — no invitation boilerplate. */

export type CardVariant = "hindu" | "christian" | "reception";

export type HostFamily = {
  /** Agilan — Hari's family; Benedict — Sharon's family */
  family: "Agilan" | "Benedict";
  line: string;
};

export type InvitationCard = {
  variant: CardVariant;
  headline: string;
  hosts: HostFamily[];
  timeLine: string;
  venue: string[];
  profiles?: { role: string; detail: string[] }[];
  compliments?: string;
};

export type StoryChapter = {
  id: "morning" | "afternoon" | "evening";
  part: string;
  when: string;
  subtitle: string;
  iso: string;
  venueUrl?: string;
  cards: InvitationCard[];
};

export const invite = {
  groomFull: "Hariharan Agilan",
  brideFull: "Sharon Belinda Benedict",
  city: "Chennai",
  weddingDateLine: "Thursday, 28th January 2027",
  countdownIso: "2027-01-28T09:00:00+05:30",
  storyLead: "Morning, afternoon, and evening.",

  chapters: [
    {
      id: "morning",
      part: "I",
      when: "Morning",
      subtitle: "Muhurtham",
      iso: "2027-01-28T09:00:00+05:30",
      venueUrl:
        "https://maps.google.com/?q=Le+Royal+M%C3%A9ridien+Chennai+GST+Road",
      cards: [
        {
          variant: "hindu",
          headline: "Muhurtham",
          hosts: [
            {
              family: "Agilan",
              line: "Smt. Mahalakshmi Agilan & Sri. Agilan Ramaswamy",
            },
            {
              family: "Benedict",
              line: "Smt. Suchitra Benedict & Dr. Benedict Xavier",
            },
          ],
          timeLine: "9:00 AM – 10:30 AM",
          venue: [
            "Lawn Venue",
            "Le Royal Méridien",
            "1, (GST) Road, Alandur, St. Thomas Mount,",
            "Chennai - 600016",
          ],
        },
      ],
    },
    {
      id: "afternoon",
      part: "II",
      when: "Afternoon",
      subtitle: "Nuptial Mass",
      iso: "2027-01-28T15:30:00+05:30",
      venueUrl: "https://maps.google.com/?q=Santhome+Cathedral+Basilica+Chennai",
      cards: [
        {
          variant: "christian",
          headline: "Nuptial Mass",
          hosts: [
            {
              family: "Benedict",
              line: "Mrs. Suchitra Benedict & Dr. Benedict Xavier",
            },
            {
              family: "Agilan",
              line: "Mrs. Mahalakshmi Agilan & Mr. Agilan Ramaswamy",
            },
          ],
          timeLine: "3:30 pm",
          venue: ["Santhome Cathedral Basilica", "Mylapore, Chennai – 600004"],
        },
      ],
    },
    {
      id: "evening",
      part: "III",
      when: "Evening",
      subtitle: "Reception",
      iso: "2027-01-28T19:00:00+05:30",
      venueUrl:
        "https://maps.google.com/?q=Le+Royal+M%C3%A9ridien+Chennai+GST+Road",
      cards: [
        {
          variant: "reception",
          headline: "Evening Reception",
          hosts: [],
          timeLine: "7:00 PM onwards",
          profiles: [
            {
              role: "Bride",
              detail: [
                "Master’s in Business Analytics, UK",
                "Operations Analyst (Comera Pay, Dubai)",
              ],
            },
            {
              role: "Groom",
              detail: [
                "Master’s in Business Analytics, UK",
                "Business Analyst (Zee Entertainment, Dubai)",
              ],
            },
          ],
          venue: [
            "Le Royal Méridien",
            "Grand Madras Ballroom",
            "1, (GST) Road, Alandur, St. Thomas Mount, Chennai – 600016",
          ],
          compliments: "Varshini Benedict & Sowmya Agilan",
        },
      ],
    },
  ] as const satisfies readonly StoryChapter[],
};
