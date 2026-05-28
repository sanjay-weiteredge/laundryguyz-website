import React from 'react';
import Layout from '@/components/layout/Layout';
import { ScrollText, ShieldCheck } from 'lucide-react';

const termsList = [
  "All garments/articles are accepted subject to inspection by The Laundry Guyz staff. Items with pre-existing damages such as cuts, tears, burns, stains, discoloration, loose buttons, weak fabric, embellishment defects, or prior repair work are processed at the customer’s risk.",
  "The Laundry Guyz uses industry-standard cleaning methods, fabric-safe chemicals, and professional garment care processes. However, due to the nature of certain fabrics and dyes, results may vary depending on garment condition and manufacturer quality.",
  "The Laundry Guyz shall not be held responsible for shrinkage, color bleeding, fading, bubbling, tearing, fabric weakening, print damage, or texture changes caused due to manufacturing defects, hidden weaknesses, or improper labeling by the garment manufacturer.",
  "Delicate garments including silk, wool, linen, designer wear, bridal wear, embellished garments, suede, leather, premium fabrics, and special-care items are accepted only at the customer’s risk.",
  "Stain removal is a part of the cleaning process but complete stain removal cannot be guaranteed. Some stains may become permanent due to age, heat treatment, chemical reaction, fabric nature, or previous attempts at cleaning.",
  "The Laundry Guyz reserves the right to refuse processing of any garment/article if it is considered unsafe, unhygienic, damaged beyond processing limits, or likely to cause damage to other garments or machinery.",
  "Customers are requested to check garment quantities at the time of pickup and delivery. Claims regarding missing articles shall not be entertained after delivery acknowledgment.",
  "The Laundry Guyz is not responsible for valuables or personal belongings left inside garments including cash, jewelry, watches, accessories, keys, documents, or electronic devices.",
  "Customers must report any complaint related to service quality, missing items, or garment damage within 24 hours of delivery. Complaints raised after this period may not be considered.",
  "In case of any proven damage directly caused during processing, the liability of The Laundry Guyz shall be limited only to the service value of the garment and not the original purchase value or sentimental value of the article.",
  "No cash refund shall be provided under any circumstances. Any approved adjustment or compensation shall be provided in the form of service credit or future laundry balance.",
  "Delivery timelines provided by The Laundry Guyz are estimated timelines only. Delays caused due to weather conditions, traffic, operational issues, festivals, strikes, force majeure events, or unforeseen situations shall not attract any penalty or compensation.",
  "Garments not collected within 30 days from the ready/delivery date may attract storage charges. Garments unclaimed for more than 90 days may be disposed of, recycled, or donated without prior notice.",
  "Customers are advised to verify all articles during delivery. Acceptance of delivery shall be treated as confirmation that the order has been received in satisfactory condition.",
  "The Laundry Guyz may use calls, SMS, WhatsApp, email, app notifications, or other communication channels to share order updates, invoices, offers, service notifications, and promotional campaigns.",
  "Any additional processing required for heavily stained garments, premium fabrics, curtains, carpets, shoes, bags, blankets, or household items may attract additional charges. Customers will be informed wherever applicable.",
  "The Laundry Guyz shall not be responsible for damages caused during removal of difficult stains, adhesives, paints, dyes, decorations, embroidery work, sequins, prints, patches, or glued accessories.",
  "Services involving shoes, bags, carpets, sofas, curtains, and household fabrics are subject to material condition and usage wear. Restoration or original appearance cannot be guaranteed.",
  "The Laundry Guyz shall not be liable for service delays, non-performance, or damages caused due to events beyond reasonable control including natural disasters, floods, fire, power failures, transportation issues, pandemics, strikes, or government restrictions.",
  "Any dispute arising from the services provided by The Laundry Guyz shall be subject to the jurisdiction of the courts applicable to the company’s registered operating location.",
  "By handing over garments/articles for processing, the customer confirms acceptance of all Terms & Conditions mentioned above without exception."
];

const Terms = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-60 h-60 bg-primary/20 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4 text-primary">
            <ScrollText className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Terms & Conditions
          </h1>
          <p className="text-muted-foreground text-md md:text-lg leading-relaxed">
            Please read these terms carefully before placing an order with The Laundry Guyz.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-secondary/10">
        <div className="container-custom max-w-4xl">
          <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-card">
            <p className="text-foreground/90 font-medium text-base mb-8 leading-relaxed pb-6 border-b border-border">
              These Terms & Conditions apply to all services offered by <strong>The Laundry Guyz</strong>, including laundry, dry cleaning, steam ironing, premium garment care, shoe cleaning, household fabric care, pickup & delivery services, and subscription plans. By placing an order with The Laundry Guyz, the customer agrees to the following terms and conditions.
            </p>

            <div className="space-y-6">
              {termsList.map((term, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary font-bold rounded-lg flex items-center justify-center text-sm">
                    {index + 1}
                  </div>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed pt-1">
                    {term}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-border text-center">
              <div className="inline-flex items-center gap-2 text-primary font-serif font-bold text-lg mb-2">
                <ShieldCheck className="w-5 h-5" />
                <span>Thank You — Visit Again!</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Last updated: May 2026. Subject to change without prior notice.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Terms;
