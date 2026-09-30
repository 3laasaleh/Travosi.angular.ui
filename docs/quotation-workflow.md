# Quotation workflow deployment

Deploy the API and Angular UI together. From the `TravelAgency` backend directory, review and apply the new migration to the intended database before starting the updated API:

```powershell
dotnet ef database update --project TravelAgency.InfraStructure --startup-project TravelAgency.API
```

Migration: `AddQuotationRoomsAndPhotos`. It adds an optional `HotelRoomId` foreign key plus a saved description and sort order to quotation lines, a photo-placement flag, and a private `QuotationImage` table. Existing quotations remain readable; when editing an old hotel-only quotation, explicitly select its rooms before saving.

Agents select a customer, currency, travel dates and services. Selecting a hotel loads `HotelRooms/ByHotel/{id}` and allows multiple rooms. Rates must cover every night (check-out is excluded); rate changes produce separate lines so rounding an average cannot change the stay total. A quote is a proposal, not an inventory reservation.

The API recalculates subtotal, discount, tax and final total. The UI converts catalog prices to the document currency through `CurrencyService` and blocks saving if the required exchange rate is unavailable. Existing saved line prices are preserved when editing.

Up to five photos can be attached above the selected services or below the totals. The browser accepts JPEG/PNG/WebP originals up to 10 MB, resizes them to at most 1200 pixels and sends JPEG data. The server independently accepts validated JPEG/PNG data up to 2 MB and 1600 pixels per image, with a 16 MB request limit. Photos are saved atomically with the quote in a separate table; they are not exposed in a public upload directory and are not loaded in quotation-list queries. Detail and PDF access follow the existing agent/admin authorization rules.

Use **Save & download PDF**, or download again from the quotation list. Filenames use the customer's name and today's date. If downloading fails after a successful save, retry from the list instead of creating a second quotation.

The configured local API must be running for browser use (`https://localhost:44382`; SSR uses `http://localhost:54800`). The backend `https` launch profile uses both addresses, so `dotnet run --project TravelAgency.API --launch-profile https` matches Angular without extra URL arguments. Migration generation and automated tests do not start it or update the configured database.
