const listing = (n: number) => `assets/images/listing/${n}.jpg`;
const blog = (n: number) => `assets/images/blog/${n}.jpg`;
const team = (n: string) => `assets/images/client/${n}.jpg`;

export const destinations = [
    { image: listing(1), place: 'Rome, Italy', hotel: '3 Hotels' },
    { image: listing(2), place: 'Singapore', hotel: '3 Hotels' },
    { image: listing(3), place: 'Paris, France', hotel: '3 Hotels' },
    { image: listing(4), place: 'Goa, India', hotel: '3 Hotels' },
    { image: listing(5), place: 'Whistler, Canada', hotel: '3 Hotels' },
    { image: listing(6), place: 'Kuala Lumpur, Malaysia', hotel: '3 Hotels' },
    { image: listing(7), place: 'Sydney, Australia', hotel: '3 Hotels' },
    { image: listing(8), place: 'Whistler, Canada', hotel: '3 Hotels' },
];

const faqItems = [
    { id: 1, title: 'How does it work ?', desc: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.' },
    { id: 2, title: 'Do I need a designer to use Sea World  ?', desc: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.' },
    { id: 3, title: 'What do I need to do to start selling ?', desc: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.' },
    { id: 4, title: 'What happens when I receive an order ?', desc: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.' },
];

export const datas = [...faqItems];
export const datas2 = [...faqItems];
export const datas3 = [...faqItems];
export const datas4 = [...faqItems];

export const guidesData = [
    { title: 'Getting started', features: ['Deciding to purchase', 'List your space', 'Landing an experience or adventure', 'Top uses questions'] },
    { title: 'Your calendar', features: ['Pricing & availability', 'Booking settings', 'Responding to enquiries & requests', 'Snoozing or deactivating your listing'] },
    { title: 'Your listings', features: ['Updating your listing', 'Neighbourhoods', 'Listing photos & photography', 'Sea World Plus', 'API-connected software'] },
    { title: 'How payouts work', features: ['Getting paid', 'Adding payout info', 'Your payout status', 'Donations', 'Taxes'] },
    { title: 'Your reservations', features: ['Sea World safely', 'Sea World Experiences and Adventures', 'Changing a reservation', 'Cancelling a reservation', 'Long-term reservations'] },
    { title: 'Reservation help', features: ['Help with a reservation or guest', 'Guest cancellations'] },
    { title: 'Your account', features: ['Your profile', 'Account security', 'Identification & verifications', 'Reviews', 'Superhost status'] },
];

export const helps = [
    { icon: 'help-circle', name: 'FAQs', desc: 'The phrasal sequence of the is now so that many campaign and benefit', button: 'Read More', to: '/helpcenter-faqs' },
    { icon: 'bookmark', name: 'Guides / Support', desc: 'The phrasal sequence of the is now so that many campaign and benefit', button: 'Read More', to: '/helpcenter-guides' },
    { icon: 'settings', name: 'Support Request', desc: 'The phrasal sequence of the is now so that many campaign and benefit', button: 'Read More', to: '/helpcenter-support' },
];

export const starts = [
    { icon: 'help-circle', name: 'How our', name2: 'Sea World', name3: 'work ?', desc: 'Due to its widespread use as filler text for layouts, non-readability is of great importance: human perception is tuned to recognize certain patterns and repetitions in texts.' },
    { icon: 'help-circle', name: ' What is the main process open account ?', desc: "If the distribution of letters and 'words' is random, the reader will not be distracted from making a neutral judgement on the visual impact." },
    { icon: 'help-circle', name: ' How to make unlimited data entry ?', desc: 'Furthermore, it is advantageous when the dummy text is relatively realistic so that the layout impression of the final publication is not compromised.' },
    { icon: 'help-circle', name: ' Is', name2: 'Sea World', name3: 'safer to use with my account ?', desc: "The most well-known dummy text is the 'Lorem Ipsum', which is said to have originated in the 16th century. Lorem Ipsum is composed in a pseudo-Latin language which more or less corresponds to 'proper' Latin." },
];

export const packageData = [
    { image: listing(1), country: 'Dubai', city: 'Cuba Sailing Adventure', discount: '10% Off', price: '$ 58 / Day' },
    { image: listing(2), country: 'Italy', city: 'Tour in New York', discount: '', price: '$ 58 / Day' },
    { image: listing(3), country: 'Maldivas', city: 'Discover Greece', discount: '', price: '$ 58 / Day' },
    { image: listing(4), country: 'USA', city: 'Museum of Modern Art', discount: '', price: '$ 58 / Day' },
    { image: listing(5), country: 'Bali', city: 'Peek Mountain View', discount: '', price: '$ 58 / Day' },
    { image: listing(6), country: 'Bangkok', city: 'Hot Baloon Journey', discount: '25% Off', price: '$ 58 / Day' },
    { image: listing(7), country: 'Singapore', city: 'Orca Camp Kayaking Trip', discount: '', price: '$ 58 / Day' },
    { image: listing(8), country: 'Thailand', city: 'Caño Cristales River Trip', discount: '20% Off', price: '$ 58 / Day' },
    { image: listing(9), country: 'Pattaya', city: 'Osa Peninsula to Dominical', discount: '', price: '$ 58 / Day' },
    { image: listing(10), country: 'Lakshadweep', city: 'History of The Emporer', discount: '', price: '$ 58 / Day' },
    { image: listing(11), country: 'Paris', city: 'Wildness of Paris', discount: '', price: '$ 58 / Day' },
    { image: listing(12), country: 'London', city: 'The Hills and Mountains', discount: '', price: '$ 58 / Day' },
];

export const blogData = [
    { image: blog(1), title: 'This Spanish city is a feast for the eyes: Sea World', status: 'Travel', desc: 'This is required when, for example, the final text is not yet available.' },
    { image: blog(2), title: 'New Zealand’s South Island brims with majestic', status: 'Tour', desc: 'This is required when, for example, the final text is not yet available.' },
    { image: blog(3), title: 'When you visit the Eternal Rome City: Sea World', status: 'Tourist', desc: 'This is required when, for example, the final text is not yet available.' },
    { image: blog(4), title: 'My Story When I Backpacked Around The World', status: 'Flight', desc: 'This is required when, for example, the final text is not yet available.' },
    { image: blog(5), title: 'Organization of accounting at the enterprise', status: 'Arab', desc: 'This is required when, for example, the final text is not yet available.' },
    { image: blog(6), title: 'Three of the Best Day Trips to Make from Francisco', status: 'Dubai', desc: 'This is required when, for example, the final text is not yet available.' },
    { image: blog(7), title: 'Why Do People Travel ? Reasons People Travel in 2023', status: 'Maldivas', desc: 'This is required when, for example, the final text is not yet available.' },
    { image: blog(8), title: 'Jungles In Australia: Vermont’s Rugged, Retro Ski Mountain', status: 'News', desc: 'This is required when, for example, the final text is not yet available.' },
    { image: blog(9), title: 'Traveller Visiting Ice Cave With Amazing Eye-catching Scenes', status: 'Packages', desc: 'This is required when, for example, the final text is not yet available.' },
];

export const instraImg = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(listing);

export const teamData = [
    { image: team('01'), name: 'Jack John', position: 'Agent' },
    { image: team('02'), name: 'Krista John', position: 'Agent' },
    { image: team('03'), name: 'Roger Jackson', position: 'Agent' },
    { image: team('04'), name: 'Johnny English', position: 'Agent' },
];

export const clientData = [
    { desc: '" It seems that only fragments of the original text remain in the Lorem Ipsum texts used today. "', image: team('02'), name: 'Calvin Carlo', position: 'Manager' },
    { desc: `" The most well-known dummy text is the 'Lorem Ipsum', which is said to have originated in the 16th century. "`, image: team('03'), name: 'Christa Smith', position: 'Manager' },
    { desc: '" One disadvantage of Lorum Ipsum is that in Latin certain letters appear more frequently than others. "', image: team('04'), name: 'Jemina CLone', position: 'Manager' },
    { desc: '" Thus, Lorem Ipsum has only limited suitability as a visual filler for German texts. "', image: team('05'), name: 'Smith Vodka', position: 'Manager' },
    { desc: '" There is now an abundance of readable dummy texts. These are usually used when a text is required. "', image: team('06'), name: 'Cristino Murfi', position: 'Manager' },
    { desc: '" According to most sources, Lorum Ipsum can be traced back to a text composed by Cicero. "', image: team('07'), name: 'Cristino Murfi', position: 'Manager' },
];
