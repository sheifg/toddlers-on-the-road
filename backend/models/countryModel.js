

const { mongoose } = require("../config/dbConnection");

// Country Schema:
const CountrySchema = new mongoose.Schema(
  { 
    name:{
       type: String,
      trim: true,
      required: true,
    },
    images: [],
    language: {
      type: String,
      trim: true,
      required: true,
    },
    capital_City: {
        type: String,
        trim: true,
        required: true,
      },
    religion: {
        type: String,
        trim: true,
        required: true,
      },
    currency: {
        type: String,
        trim: true,
        required: true,
      },
    cultural_Info: {
        type: String,
        trim: true,
        required: true,
      },
    food_Specialties: {
        type: String,
        trim: true,
        required: true,
      },
      emergency_Contacts:{
        type: String,
        trim: true,
        required: true,
      }
      
  },
  { timestamps: true, collection: "country" }
);

module.exports = mongoose.model("Country", CountrySchema);





/* Developer should have a complete collection in the Mongo database that includes 20 countries 

Each country “item” should include: Name, Language, Capital City, Religion, Currency, Cultural Information, Food specialties, Emergency Contact Info and Image 

This information will be gathered via search engine and ChatGPT --- to be added manually to the collection in Mongo 

T-shirt size: Large

Here's a detailed list of 20 countries with their key information:

1. Japan
Language: Japanese

Capital City: Tokyo

Religion: Shinto, Buddhism

Currency: Japanese Yen (JPY)

Cultural Info: Known for its tea ceremonies, traditional arts (ikebana, calligraphy), and samurai history.

Food Specialties: Sushi, ramen, tempura, sashimi.

2. India
Language: Hindi, English (official), regional languages

Capital City: New Delhi

Religion: Hinduism, Islam, Christianity, Sikhism

Currency: Indian Rupee (INR)

Cultural Info: Known for yoga, classical dances like Bharatanatyam, and festivals like Diwali and Holi.

Food Specialties: Biryani, samosas, tandoori chicken, dosas.

3. France
Language: French

Capital City: Paris

Religion: Christianity (mainly Catholic)

Currency: Euro (EUR)

Cultural Info: Renowned for fashion, art museums like the Louvre, and wine culture.

Food Specialties: Croissants, baguettes, coq au vin, ratatouille.

4. Italy
Language: Italian

Capital City: Rome

Religion: Christianity (Roman Catholic)

Currency: Euro (EUR)

Cultural Info: Known for ancient Roman history, the Renaissance, and Vatican City.

Food Specialties: Pizza, pasta, gelato, risotto.

5. Brazil
Language: Portuguese

Capital City: Brasília

Religion: Christianity (mainly Catholic)

Currency: Brazilian Real (BRL)

Cultural Info: Famous for samba, Carnival, and soccer (football).

Food Specialties: Feijoada, pão de queijo, churrasco.

6. China
Language: Mandarin Chinese

Capital City: Beijing

Religion: Buddhism, Taoism, Confucianism

Currency: Renminbi (Yuan, CNY)

Cultural Info: Known for the Great Wall, martial arts, and traditional medicine.

Food Specialties: Peking duck, dumplings, hot pot.

7. Mexico
Language: Spanish

Capital City: Mexico City

Religion: Christianity (mainly Catholic)

Currency: Mexican Peso (MXN)

Cultural Info: Known for Day of the Dead, mariachi music, and ancient Aztec/Maya ruins.

Food Specialties: Tacos, enchiladas, mole.

8. Germany
Language: German

Capital City: Berlin

Religion: Christianity (Protestant, Catholic)

Currency: Euro (EUR)

Cultural Info: Known for Oktoberfest, classical music (Beethoven, Bach), and engineering.

Food Specialties: Bratwurst, pretzels, schnitzel, sauerkraut.

9. Egypt
Language: Arabic

Capital City: Cairo

Religion: Islam (mainly Sunni)

Currency: Egyptian Pound (EGP)

Cultural Info: Famous for pyramids, ancient pharaohs, and Nile River culture.

Food Specialties: Koshari, falafel, molokhia.

10. United States
Language: English

Capital City: Washington, D.C.

Religion: Christianity (various denominations)

Currency: US Dollar (USD)

Cultural Info: Known for pop culture, Hollywood, and diverse immigration.

Food Specialties: Burgers, barbecue, apple pie.

11. Turkey
Language: Turkish

Capital City: Ankara

Religion: Islam (mainly Sunni)

Currency: Turkish Lira (TRY)

Cultural Info: Known for Ottoman history, bazaars, and hammams (baths).

Food Specialties: Kebabs, baklava, Turkish tea.

12. Thailand
Language: Thai

Capital City: Bangkok

Religion: Buddhism

Currency: Thai Baht (THB)

Cultural Info: Known for its temples, festivals (Songkran), and traditional dance.

Food Specialties: Pad Thai, tom yum soup, green curry.

13. South Korea
Language: Korean

Capital City: Seoul

Religion: Buddhism, Christianity

Currency: South Korean Won (KRW)

Cultural Info: Known for K-pop, tech innovation, and traditional hanbok attire.

Food Specialties: Kimchi, bibimbap, bulgogi.

14. Russia
Language: Russian

Capital City: Moscow

Religion: Christianity (Russian Orthodox)

Currency: Russian Ruble (RUB)

Cultural Info: Known for ballet, literature (Tolstoy, Dostoevsky), and onion-domed architecture.

Food Specialties: Borscht, pelmeni, blini.

15. Spain
Language: Spanish

Capital City: Madrid

Religion: Christianity (mainly Catholic)

Currency: Euro (EUR)

Cultural Info: Known for flamenco, bullfighting, and siestas.

Food Specialties: Paella, tapas, churros.

16. Greece
Language: Greek

Capital City: Athens

Religion: Christianity (Greek Orthodox)

Currency: Euro (EUR)

Cultural Info: Known for ancient philosophy, mythology, and Olympic history.

Food Specialties: Moussaka, souvlaki, tzatziki.

17. Australia
Language: English

Capital City: Canberra

Religion: Christianity, secular population

Currency: Australian Dollar (AUD)

Cultural Info: Known for Aboriginal culture, beaches, and wildlife like kangaroos.

Food Specialties: Vegemite, meat pies, pavlova.

18. South Africa
Language: 11 official languages (Zulu, Xhosa, Afrikaans, English, etc.)

Capital City: Pretoria (administrative), Cape Town (legislative), Bloemfontein (judicial)

Religion: Christianity, traditional beliefs

Currency: South African Rand (ZAR)

Cultural Info: Known for Nelson Mandela, safaris, and diverse cultures.

Food Specialties: Braai, bobotie, biltong.

19. Argentina
Language: Spanish

Capital City: Buenos Aires

Religion: Christianity (mainly Catholic)

Currency: Argentine Peso (ARS)

Cultural Info: Known for tango, Patagonia, and gaucho traditions.

Food Specialties: Asado, empanadas, dulce de leche.

20. Morocco
Language: Arabic, Berber

Capital City: Rabat

Religion: Islam (mainly Sunni)

Currency: Moroccan Dirham (MAD)

Cultural Info: Known for souks, Islamic architecture, and desert culture.

Food Specialties: Tagine, couscous, mint tea.

Here’s the updated list with emergency contact information and links to Google Images for iconic visuals of each country:

1. Japan
Emergency Contacts:

Police: 110

Ambulance/Fire: 119

Google Images (Iconic View): Mount Fuji

2. India
Emergency Contacts:

Police: 112

Ambulance: 108

Fire: 101

Google Images (Iconic View): Taj Mahal

3. France
Emergency Contacts:

Police: 17

Ambulance: 15

Fire: 18

Google Images (Iconic View): Eiffel Tower

4. Italy
Emergency Contacts:

Police: 112

Ambulance: 118

Fire: 115

Google Images (Iconic View): Colosseum

5. Brazil
Emergency Contacts:

Police: 190

Ambulance: 192

Fire: 193

Google Images (Iconic View): Christ the Redeemer

6. China
Emergency Contacts:

Police: 110

Ambulance: 120

Fire: 119

Google Images (Iconic View): Great Wall of China

7. Mexico
Emergency Contacts:

Police/Ambulance/Fire: 911

Google Images (Iconic View): Chichen Itza

8. Germany
Emergency Contacts:

Police: 110

Ambulance/Fire: 112

Google Images (Iconic View): Neuschwanstein Castle

9. Egypt
Emergency Contacts:

Police: 122

Ambulance: 123

Fire: 180

Google Images (Iconic View): Pyramids of Giza

10. United States
Emergency Contacts:

Police/Ambulance/Fire: 911

Google Images (Iconic View): Statue of Liberty

11. Turkey
Emergency Contacts:

Police: 155

Ambulance: 112

Fire: 110

Google Images (Iconic View): Hagia Sophia

12. Thailand
Emergency Contacts:

Police: 191

Tourist Police: 1155

Ambulance/Fire: 1669

Google Images (Iconic View): Grand Palace

13. South Korea
Emergency Contacts:

Police: 112

Ambulance/Fire: 119

Google Images (Iconic View): Gyeongbokgung Palace

14. Russia
Emergency Contacts:

Police: 102

Ambulance/Fire: 103

Google Images (Iconic View): Saint Basil's Cathedral

15. Spain
Emergency Contacts:

Police: 091 (National), 112 (General)

Ambulance/Fire: 112

Google Images (Iconic View): Sagrada Familia

16. Greece
Emergency Contacts:

Police: 100

Ambulance: 166

Fire: 199

Google Images (Iconic View): Parthenon

17. Australia
Emergency Contacts:

Police/Ambulance/Fire: 000

Google Images (Iconic View): Sydney Opera House

18. South Africa
Emergency Contacts:

Police: 10111

Ambulance: 10177

Fire: 112 (mobile)

Google Images (Iconic View): Table Mountain

19. Argentina
Emergency Contacts:

Police: 101

Ambulance/Fire: 107

Google Images (Iconic View): Iguazu Falls

20. Morocco
Emergency Contacts:

Police: 19

Ambulance/Fire: 15

Google Images (Iconic View): Chefchaouen (Blue City)

 */