export default function ArsenalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* === ISOLATED MERCHANT SCHEMA === */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": "Dreams Of Colour Official Merchandise",
            "description": "Premium apparel, physical drops, and digital asset vaults by G-Wizz, The Slayer.",
            "brand": {
              "@type": "Brand",
              "name": "G-Wizz, The Slayer"
            },
            "identifier_exists": false,
            "offers": {
              "@type": "Offer",
              "priceCurrency": "USD",
              "price": "22.00",
              "availability": "https://schema.org/InStock",
              "hasMerchantReturnPolicy": {
                "@type": "MerchantReturnPolicy",
                "applicableCountry": "ZA",
                "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
                "merchantReturnDays": "30",
                "returnMethod": "https://schema.org/ReturnByMail"
              },
              "shippingDetails": {
                "@type": "OfferShippingDetails",
                "shippingRate": {
                  "@type": "MonetaryAmount",
                  "value": "5.00",
                  "currency": "USD"
                },
                "shippingDestination": {
                  "@type": "DefinedRegion",
                  "addressCountry": "ZA"
                },
                "deliveryTime": {
                  "@type": "ShippingDeliveryTime",
                  "transitTime": {
                    "@type": "QuantitativeValue",
                    "minValue": "3",
                    "maxValue": "7",
                    "unitCode": "d"
                  }
                }
              }
            }
          })
        }}
      />
      {children}
    </>
  );
}
