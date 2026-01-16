import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'fr' | 'en' | 'nl';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  fr: {
    'hero.title': 'OptionImmo',
    'hero.subtitle': 'L\'avenir de l\'immobilier se négocie aujourd\'hui',
    'hero.cta': 'Ca m\'intéresse',

    'stats.guaranteed_compensation.title': 'Indemnité Garantie',
    'stats.guaranteed_compensation.description': 'Compensation financière acquise si la vente n\'aboutit pas',
    'stats.zero_risk.title': 'Zéro Risque',
    'stats.zero_risk.description': 'Transaction sécurisée par un dépôt de garantie dès la signature',
    'stats.preserved_price.title': 'Prix Préservé',
    'stats.preserved_price.description': 'Prix souhaité préservé sans négociations agressives',
    'stats.privileged_access.title': 'Accès Privilégié',
    'stats.privileged_access.description': 'Réseau de promoteurs et d\'investisseurs qualifiés',
    'stats.single_contact.title': 'Interlocuteur Unique',
    'stats.single_contact.description': 'Fini le défilé des visites inutiles, nous gérons tout de A à Z',

    'services.title': 'Fonctionnement de l\'option immobilière',
    'services.question.title': 'Qu\'est-ce qu\'une option ?',
    'services.question.description': 'Une option immobilière est un contrat innovant qui vous permet de réserver votre bien auprès d\'un acheteur potentiel pour une durée déterminée. L\'acheteur verse une prime d\'option en échange du droit exclusif d\'acheter votre bien à un prix convenu, sans obligation immédiate.',
    'services.how_it_works.title': 'Comment ça marche ?',
    'services.how_it_works.description': 'Vous fixez un prix de vente et une durée (8, 10 ou 12 mois). Un investisseur achète l\'option et vous verse une prime immédiate. Pendant la durée de l\'option, il peut acheter votre bien au prix convenu. Si l\'option n\'est pas exercée, vous conservez la prime et récupérez la pleine disposition de votre bien.',
    'services.advantages': 'Avantages',

    'services.financial_guarantee.title': 'La garantie financière',
    'services.financial_guarantee.description': 'Lorsqu\'un vendeur signe une promesse unilatérale de vente, il reçoit une indemnité d\'immobilisation (généralement 5 à 10% du prix), souvent bloquée chez le notaire.',
    'services.financial_guarantee.extra': 'Si l\'option n\'est pas levée, le vendeur conserve l\'indemnité à titre de dédommagement pour avoir retiré son bien du marché. C\'est une sécurité financière que l\'on ne retrouve pas avec la même souplesse dans un compromis classique où la rupture peut mener à de longs litiges judiciaires.',

    'services.secured_price.title': 'Le prix de vente est sécurisé',
    'services.secured_price.description': 'L\'investisseur qui pratique l\'option ne cherche généralement pas à négocier le prix de manière agressive. Son but est de trouver une marge au-dessus du prix demandé.',
    'services.secured_price.extra': 'Pour le vendeur, c\'est l\'assurance d\'obtenir son prix de marché ou un prix net vendeur satisfaisant sans avoir à gérer les visites multiples et les négociations avec des particuliers.',

    'services.professional_buyers.title': 'L\'accès à des acheteurs professionnels',
    'services.professional_buyers.description': 'L\'intermédiaire qui achète l\'option a souvent un réseau étendu que le vendeur n\'a pas. Il peut présenter le projet à des promoteurs immobiliers, des marchands de biens ou des investisseurs institutionnels.',
    'services.professional_buyers.extra': 'Ces acheteurs finaux sont souvent plus solides financièrement que des particuliers dont le prêt peut être refusé, offrant ainsi une transaction plus sécurisée.',

    'services.property_valorization.title': 'La valorisation du bien sans effort',
    'services.property_valorization.description': 'L\'intermédiaire va investir du temps et de l\'argent pour purger des permis de construire ou réaliser des études de faisabilité pendant la durée de l\'option.',
    'services.property_valorization.extra': 'Si l\'opération réussit, le vendeur vend son bien au prix convenu. Si elle échoue, il récupère son bien, souvent avec les études déjà faites ou une meilleure connaissance du potentiel de son actif, tout en gardant l\'indemnité.',

    'services.simplified_management.title': 'Une gestion simplifiée',
    'services.simplified_management.description': 'Le vendeur n\'a qu\'un seul interlocuteur pendant toute la phase de recherche de l\'acquéreur final. Il n\'a pas à subir le défilé des visites.',
    'services.simplified_management.extra': 'L\'intermédiaire filtre le marché et ne fait venir l\'acheteur final que lorsque le dossier est mûr, simplifiant considérablement le processus de vente.',

    'contact.title': 'Proposer un bien',
    'contact.subtitle': 'Introduisez les informations du bien et nous nous chargerons de vous recontacter',
    'contact.success': 'Merci ! Nous avons bien reçu votre demande et nous vous contacterons dans les 3 jours ouvrables.',
    'contact.error': 'Échec de l\'envoi de votre demande. Veuillez réessayer.',

    'form.last_name': 'Nom',
    'form.first_name': 'Prénom',
    'form.email': 'Email',
    'form.phone': 'Numéro de téléphone',
    'form.asset_type': 'Type de bien',
    'form.asset_type.placeholder': 'Sélectionner le type de bien',
    'form.asset_type.house': 'Maison',
    'form.asset_type.apartment': 'Appartement',
    'form.asset_type.building': 'Immeuble de rapport',
    'form.asset_type.commercial': 'Commerce',
    'form.asset_type.land': 'Terrain',
    'form.asset_type.garage': 'Garage',
    'form.asset_location': 'Adresse (seulement en Belgique)',
    'form.asset_location.placeholder': 'Commencez à taper une adresse...',
    'form.asset_value': 'Valeur estimée du bien',
    'form.deadline': 'Délais maximum souhaité pour la vente',
    'form.deadline.placeholder': 'Sélectionner un délai',
    'form.deadline.8months': '8 mois',
    'form.deadline.10months': '10 mois',
    'form.deadline.12months': '12 mois',
    'form.message': 'Informations complémentaires',
    'form.message.placeholder': 'Veuillez mentionnez la surface, nombre de pièces, l\'état général, etc.',
    'form.photos': 'Photos du bien',
    'form.photos.upload': 'Cliquez pour ajouter des photos',
    'form.photos.format': 'PNG, JPG, JPEG jusqu\'à 10MB',
    'form.submit': 'Envoyer',
    'form.submitting': 'Submitting...',
    'form.required': '*',
    'form.error.required': 'Ce champ est obligatoire',
    'form.consent': 'J\'accepte que mes données personnelles soient traitées conformément à la',
    'form.consent.privacy_policy': 'politique de confidentialité',
    'form.error.consent': 'Vous devez accepter la politique de confidentialité pour continuer',

    'privacy.title': 'Politique de Confidentialité',
    'privacy.intro': 'OptionImmo s\'engage à protéger vos données personnelles et à respecter vos droits conformément au Règlement Général sur la Protection des Données (RGPD).',
    'privacy.collection.title': '1. Collecte des Données',
    'privacy.collection.text': 'Nous collectons les données personnelles suivantes : nom, prénom, email, numéro de téléphone, informations sur votre bien immobilier (type, localisation, valeur estimée, photos) et toute information complémentaire que vous choisissez de nous fournir.',
    'privacy.purpose.title': '2. Finalité du Traitement',
    'privacy.purpose.text': 'Vos données sont collectées dans le but de traiter votre demande d\'évaluation immobilière, vous recontacter pour discuter de votre projet, gérer notre relation commerciale et vous proposer nos services d\'option immobilière.',
    'privacy.legal.title': '3. Base Légale',
    'privacy.legal.text': 'Le traitement de vos données repose sur votre consentement explicite que vous nous accordez lors de la soumission du formulaire de contact.',
    'privacy.recipients.title': '4. Destinataires des Données',
    'privacy.recipients.text': 'Vos données sont destinées aux équipes d\'OptionImmo (commerciaux, conseillers immobiliers). Elles peuvent également être partagées avec nos partenaires (notaires, experts immobiliers, investisseurs qualifiés) uniquement dans le cadre du traitement de votre demande et avec votre accord préalable.',
    'privacy.retention.title': '5. Durée de Conservation',
    'privacy.retention.text': 'Vos données personnelles sont conservées pendant 3 ans à compter de notre dernier contact avec vous. Au-delà de cette période, elles seront supprimées ou anonymisées, sauf obligation légale de conservation plus longue.',
    'privacy.rights.title': '6. Vos Droits',
    'privacy.rights.text': 'Conformément au RGPD, vous disposez des droits suivants :',
    'privacy.rights.access': 'Droit d\'accès : obtenir une copie de vos données personnelles',
    'privacy.rights.rectification': 'Droit de rectification : corriger des données inexactes ou incomplètes',
    'privacy.rights.erasure': 'Droit à l\'effacement : demander la suppression de vos données',
    'privacy.rights.restriction': 'Droit à la limitation : restreindre le traitement de vos données',
    'privacy.rights.portability': 'Droit à la portabilité : recevoir vos données dans un format structuré',
    'privacy.rights.objection': 'Droit d\'opposition : vous opposer au traitement de vos données',
    'privacy.rights.withdraw': 'Droit de retirer votre consentement : à tout moment, sans affecter la licéité du traitement antérieur',
    'privacy.exercise.title': '7. Exercer Vos Droits',
    'privacy.exercise.text': 'Pour exercer l\'un de ces droits, contactez-nous par email à contact@optionimmo.be ou par courrier à notre adresse. Nous nous engageons à répondre dans un délai d\'un mois.',
    'privacy.security.title': '8. Sécurité des Données',
    'privacy.security.text': 'Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte, destruction ou altération.',
    'privacy.complaint.title': '9. Droit de Réclamation',
    'privacy.complaint.text': 'Vous avez le droit d\'introduire une réclamation auprès de l\'Autorité de Protection des Données (APD) si vous estimez que le traitement de vos données viole le RGPD.',
    'privacy.updates.title': '10. Modifications',
    'privacy.updates.text': 'Nous nous réservons le droit de modifier cette politique de confidentialité. Toute modification sera publiée sur cette page avec une date de mise à jour.',
    'privacy.contact.title': '11. Contact',
    'privacy.contact.text': 'Pour toute question concernant cette politique de confidentialité ou le traitement de vos données personnelles, contactez-nous à :',
    'privacy.contact.email': 'Email : contact@optionimmo.be',
    'privacy.contact.phone': 'Téléphone : +32 (0)2 XXX XX XX',
    'privacy.last_updated': 'Dernière mise à jour : 15 janvier 2026',

    'footer.description': 'Sécurisez la vente de votre bien au prix juste grâce à l\'option immobilière : l\'exclusivité pour l\'acheteur, la liberté et une prime garantie pour vous.',
    'footer.contact_info': 'Informations de Contact',
    'footer.hours': 'Disponibilités',
    'footer.hours.weekday': 'Lundi - Vendredi: 9h00 - 18h00',
    'footer.hours.saturday': 'Samedi: 9h00 - 14h00',
    'footer.hours.sunday': 'Dimanche: Non disponible',
    'footer.copyright': 'OptionImmo. Tous droits réservés.',

    'cookies.title': 'Nous utilisons des cookies',
    'cookies.description': 'Nous utilisons des cookies pour améliorer votre expérience sur notre site, analyser le trafic et personnaliser le contenu. En cliquant sur "Accepter", vous consentez à l\'utilisation de tous les cookies. Vous pouvez également refuser les cookies non essentiels.',
    'cookies.accept': 'Accepter tous les cookies',
    'cookies.reject': 'Refuser',
  },
  en: {
    'hero.title': 'OptionImmo',
    'hero.subtitle': 'The future of real estate is negotiated today',
    'hero.cta': 'I\'m interested',

    'stats.guaranteed_compensation.title': 'Guaranteed Compensation',
    'stats.guaranteed_compensation.description': 'Financial compensation acquired if the sale does not go through',
    'stats.zero_risk.title': 'Zero Risk',
    'stats.zero_risk.description': 'Transaction secured by a security deposit from signing',
    'stats.preserved_price.title': 'Preserved Price',
    'stats.preserved_price.description': 'Desired price preserved without aggressive negotiations',
    'stats.privileged_access.title': 'Privileged Access',
    'stats.privileged_access.description': 'Network of qualified developers and investors',
    'stats.single_contact.title': 'Single Contact',
    'stats.single_contact.description': 'No more parade of useless visits, we handle everything from A to Z',

    'services.title': 'How Real Estate Options Work',
    'services.question.title': 'What is an option?',
    'services.question.description': 'A real estate option is an innovative contract that allows you to reserve your property with a potential buyer for a specified period. The buyer pays an option premium in exchange for the exclusive right to purchase your property at an agreed price, without immediate obligation.',
    'services.how_it_works.title': 'How does it work?',
    'services.how_it_works.description': 'You set a sale price and duration (8, 10 or 12 months). An investor buys the option and pays you an immediate premium. During the option period, they can purchase your property at the agreed price. If the option is not exercised, you keep the premium and regain full control of your property.',
    'services.advantages': 'Advantages',

    'services.financial_guarantee.title': 'Financial Guarantee',
    'services.financial_guarantee.description': 'When a seller signs a unilateral promise to sell, they receive an immobilization fee (generally 5 to 10% of the price), often held by the notary.',
    'services.financial_guarantee.extra': 'If the option is not exercised, the seller keeps the fee as compensation for removing their property from the market. This is a financial security not found with the same flexibility in a standard sales agreement where breach can lead to lengthy legal disputes.',

    'services.secured_price.title': 'Secured Sale Price',
    'services.secured_price.description': 'The investor practicing the option generally does not seek to aggressively negotiate the price. Their goal is to find a margin above the asking price.',
    'services.secured_price.extra': 'For the seller, this is the assurance of obtaining their market price or a satisfactory net price without having to manage multiple visits and negotiations with individual buyers.',

    'services.professional_buyers.title': 'Access to Professional Buyers',
    'services.professional_buyers.description': 'The intermediary who buys the option often has an extensive network that the seller does not have. They can present the project to real estate developers, property dealers, or institutional investors.',
    'services.professional_buyers.extra': 'These final buyers are often more financially solid than individuals whose loans may be refused, thus offering a more secure transaction.',

    'services.property_valorization.title': 'Property Enhancement Without Effort',
    'services.property_valorization.description': 'The intermediary will invest time and money to secure building permits or conduct feasibility studies during the option period.',
    'services.property_valorization.extra': 'If the operation succeeds, the seller sells their property at the agreed price. If it fails, they recover their property, often with studies already completed or better knowledge of their asset\'s potential, while keeping the fee.',

    'services.simplified_management.title': 'Simplified Management',
    'services.simplified_management.description': 'The seller has only one contact person throughout the entire search phase for the final buyer. They do not have to endure a parade of visits.',
    'services.simplified_management.extra': 'The intermediary filters the market and only brings the final buyer when the file is ready, greatly simplifying the sales process.',

    'contact.title': 'Submit a Property',
    'contact.subtitle': 'Enter the property information and we will contact you back',
    'contact.success': 'Thank you! We\'ve received your inquiry and will contact you within 3 working days.',
    'contact.error': 'Failed to submit your inquiry. Please try again.',

    'form.last_name': 'Last Name',
    'form.first_name': 'First Name',
    'form.email': 'Email',
    'form.phone': 'Phone Number',
    'form.asset_type': 'Property Type',
    'form.asset_type.placeholder': 'Select property type',
    'form.asset_type.house': 'House',
    'form.asset_type.apartment': 'Apartment',
    'form.asset_type.building': 'Rental Building',
    'form.asset_type.commercial': 'Commercial',
    'form.asset_type.land': 'Land',
    'form.asset_type.garage': 'Garage',
    'form.asset_location': 'Address (only in Belgium)',
    'form.asset_location.placeholder': 'Start typing an address...',
    'form.asset_value': 'Estimated Property Value',
    'form.deadline': 'Maximum desired deadline for sale',
    'form.deadline.placeholder': 'Select a deadline',
    'form.deadline.8months': '8 months',
    'form.deadline.10months': '10 months',
    'form.deadline.12months': '12 months',
    'form.message': 'Additional Information',
    'form.message.placeholder': 'Please mention the surface area, number of rooms, general condition, etc.',
    'form.photos': 'Property Photos',
    'form.photos.upload': 'Click to add photos',
    'form.photos.format': 'PNG, JPG, JPEG up to 10MB',
    'form.submit': 'Submit',
    'form.submitting': 'Submitting...',
    'form.required': '*',
    'form.error.required': 'This field is required',
    'form.consent': 'I agree that my personal data will be processed in accordance with the',
    'form.consent.privacy_policy': 'privacy policy',
    'form.error.consent': 'You must accept the privacy policy to continue',

    'privacy.title': 'Privacy Policy',
    'privacy.intro': 'OptionImmo is committed to protecting your personal data and respecting your rights in accordance with the General Data Protection Regulation (GDPR).',
    'privacy.collection.title': '1. Data Collection',
    'privacy.collection.text': 'We collect the following personal data: first name, last name, email, phone number, information about your property (type, location, estimated value, photos) and any additional information you choose to provide.',
    'privacy.purpose.title': '2. Purpose of Processing',
    'privacy.purpose.text': 'Your data is collected to process your property evaluation request, contact you to discuss your project, manage our business relationship and offer you our real estate option services.',
    'privacy.legal.title': '3. Legal Basis',
    'privacy.legal.text': 'The processing of your data is based on your explicit consent that you give us when submitting the contact form.',
    'privacy.recipients.title': '4. Data Recipients',
    'privacy.recipients.text': 'Your data is intended for OptionImmo teams (sales representatives, real estate advisors). It may also be shared with our partners (notaries, real estate experts, qualified investors) only for processing your request and with your prior agreement.',
    'privacy.retention.title': '5. Retention Period',
    'privacy.retention.text': 'Your personal data is retained for 3 years from our last contact with you. Beyond this period, it will be deleted or anonymized, except for longer legal retention obligations.',
    'privacy.rights.title': '6. Your Rights',
    'privacy.rights.text': 'In accordance with GDPR, you have the following rights:',
    'privacy.rights.access': 'Right of access: obtain a copy of your personal data',
    'privacy.rights.rectification': 'Right of rectification: correct inaccurate or incomplete data',
    'privacy.rights.erasure': 'Right to erasure: request deletion of your data',
    'privacy.rights.restriction': 'Right to restriction: restrict the processing of your data',
    'privacy.rights.portability': 'Right to portability: receive your data in a structured format',
    'privacy.rights.objection': 'Right to object: object to the processing of your data',
    'privacy.rights.withdraw': 'Right to withdraw consent: at any time, without affecting the lawfulness of prior processing',
    'privacy.exercise.title': '7. Exercise Your Rights',
    'privacy.exercise.text': 'To exercise any of these rights, contact us by email at contact@optionimmo.be or by mail at our address. We commit to responding within one month.',
    'privacy.security.title': '8. Data Security',
    'privacy.security.text': 'We implement appropriate technical and organizational measures to protect your data against unauthorized access, loss, destruction or alteration.',
    'privacy.complaint.title': '9. Right to Complaint',
    'privacy.complaint.text': 'You have the right to lodge a complaint with the Data Protection Authority (DPA) if you believe that the processing of your data violates GDPR.',
    'privacy.updates.title': '10. Modifications',
    'privacy.updates.text': 'We reserve the right to modify this privacy policy. Any modification will be published on this page with an update date.',
    'privacy.contact.title': '11. Contact',
    'privacy.contact.text': 'For any questions regarding this privacy policy or the processing of your personal data, contact us at:',
    'privacy.contact.email': 'Email: contact@optionimmo.be',
    'privacy.contact.phone': 'Phone: +32 (0)2 XXX XX XX',
    'privacy.last_updated': 'Last updated: January 15, 2026',

    'footer.description': 'Secure the sale of your property at the right price with the real estate option: exclusivity for the buyer, freedom and a guaranteed bonus for you.',
    'footer.contact_info': 'Contact Information',
    'footer.hours': 'Availability',
    'footer.hours.weekday': 'Monday - Friday: P:00 AM - 6:00 PM',
    'footer.hours.saturday': 'Saturday: 9:00 AM - 2:00 PM',
    'footer.hours.sunday': 'Sunday: Unavailable',
    'footer.copyright': 'OptionImmo. All rights reserved.',

    'cookies.title': 'We use cookies',
    'cookies.description': 'We use cookies to enhance your experience on our site, analyze traffic, and personalize content. By clicking "Accept", you consent to the use of all cookies. You can also refuse non-essential cookies.',
    'cookies.accept': 'Accept all cookies',
    'cookies.reject': 'Reject',
  },
  nl: {
    'hero.title': 'OptionImmo',
    'hero.subtitle': 'De toekomst van vastgoed wordt vandaag onderhandeld',
    'hero.cta': 'Ik ben geïnteresseerd',

    'stats.guaranteed_compensation.title': 'Gegarandeerde Vergoeding',
    'stats.guaranteed_compensation.description': 'Financiële compensatie verkregen als de verkoop niet doorgaat',
    'stats.zero_risk.title': 'Nul Risico',
    'stats.zero_risk.description': 'Transactie gewaarborgd door een borgsom vanaf ondertekening',
    'stats.preserved_price.title': 'Bewaarde Prijs',
    'stats.preserved_price.description': 'Gewenste prijs behouden zonder agressieve onderhandelingen',
    'stats.privileged_access.title': 'Bevoorrechte Toegang',
    'stats.privileged_access.description': 'Netwerk van gekwalificeerde ontwikkelaars en investeerders',
    'stats.single_contact.title': 'Enkel Contactpersoon',
    'stats.single_contact.description': 'Geen parade van nutteloze bezoeken meer, wij regelen alles van A tot Z',

    'services.title': 'Hoe Vastgoedopties Werken',
    'services.question.title': 'Wat is een optie?',
    'services.question.description': 'Een vastgoedoptie is een innovatief contract waarmee u uw eigendom kunt reserveren bij een potentiële koper voor een bepaalde periode. De koper betaalt een optiepremie in ruil voor het exclusieve recht om uw eigendom te kopen tegen een overeengekomen prijs, zonder onmiddellijke verplichting.',
    'services.how_it_works.title': 'Hoe werkt het?',
    'services.how_it_works.description': 'U stelt een verkoopprijs en duur vast (8, 10 of 12 maanden). Een investeerder koopt de optie en betaalt u een onmiddellijke premie. Tijdens de optieperiode kunnen zij uw eigendom kopen tegen de overeengekomen prijs. Als de optie niet wordt uitgeoefend, houdt u de premie en krijgt u de volledige beschikking over uw eigendom terug.',
    'services.advantages': 'Voordelen',

    'services.financial_guarantee.title': 'Financiële Garantie',
    'services.financial_guarantee.description': 'Wanneer een verkoper een eenzijdige verkoopbelofte ondertekent, ontvangt hij een immobilisatievergoeding (over het algemeen 5 tot 10% van de prijs), vaak geblokkeerd bij de notaris.',
    'services.financial_guarantee.extra': 'Als de optie niet wordt uitgeoefend, behoudt de verkoper de vergoeding als compensatie voor het terugtrekken van zijn eigendom van de markt. Dit is een financiële zekerheid die niet wordt gevonden met dezelfde flexibiliteit in een standaard verkoopovereenkomst waarbij een breuk kan leiden tot langdurige juridische geschillen.',

    'services.secured_price.title': 'Gewaarborgde Verkoopprijs',
    'services.secured_price.description': 'De investeerder die de optie hanteert, probeert over het algemeen niet agressief over de prijs te onderhandelen. Hun doel is om een marge boven de vraagprijs te vinden.',
    'services.secured_price.extra': 'Voor de verkoper is dit de garantie om hun marktprijs of een bevredigende nettoprijs te verkrijgen zonder meerdere bezichtigingen en onderhandelingen met individuele kopers te hoeven beheren.',

    'services.professional_buyers.title': 'Toegang tot Professionele Kopers',
    'services.professional_buyers.description': 'De tussenpersoon die de optie koopt, heeft vaak een uitgebreid netwerk dat de verkoper niet heeft. Ze kunnen het project presenteren aan vastgoedontwikkelaars, goederenhandelaren of institutionele investeerders.',
    'services.professional_buyers.extra': 'Deze uiteindelijke kopers zijn vaak financieel solider dan particulieren wiens leningen kunnen worden geweigerd, waardoor een veiligere transactie wordt geboden.',

    'services.property_valorization.title': 'Vastgoedverbetering Zonder Inspanning',
    'services.property_valorization.description': 'De tussenpersoon zal tijd en geld investeren om bouwvergunningen veilig te stellen of haalbaarheidsstudies uit te voeren tijdens de optieperiode.',
    'services.property_valorization.extra': 'Als de operatie slaagt, verkoopt de verkoper zijn eigendom tegen de overeengekomen prijs. Als het mislukt, krijgt hij zijn eigendom terug, vaak met reeds voltooide studies of betere kennis van het potentieel van zijn activa, terwijl hij de vergoeding behoudt.',

    'services.simplified_management.title': 'Vereenvoudigd Beheer',
    'services.simplified_management.description': 'De verkoper heeft slechts één contactpersoon tijdens de gehele zoekfase naar de uiteindelijke koper. Ze hoeven geen parade van bezoeken te doorstaan.',
    'services.simplified_management.extra': 'De tussenpersoon filtert de markt en brengt alleen de uiteindelijke koper wanneer het dossier klaar is, waardoor het verkoopproces aanzienlijk wordt vereenvoudigd.',

    'contact.title': 'Een Eigendom Voorstellen',
    'contact.subtitle': 'Voer de eigendominformatie in en wij nemen contact met u op',
    'contact.success': 'Bedankt! We hebben uw aanvraag ontvangen en nemen binnen 3 werkdagen contact met u op.',
    'contact.error': 'Het indienen van uw aanvraag is mislukt. Probeer het opnieuw.',

    'form.last_name': 'Achternaam',
    'form.first_name': 'Voornaam',
    'form.email': 'E-mail',
    'form.phone': 'Telefoonnummer',
    'form.asset_type': 'Type Eigendom',
    'form.asset_type.placeholder': 'Selecteer type eigendom',
    'form.asset_type.house': 'Huis',
    'form.asset_type.apartment': 'Appartement',
    'form.asset_type.building': 'Opbrengsteigendom',
    'form.asset_type.commercial': 'Commercieel',
    'form.asset_type.land': 'Grond',
    'form.asset_type.garage': 'Garage',
    'form.asset_location': 'Adres (alleen in België)',
    'form.asset_location.placeholder': 'Begin met typen van een adres...',
    'form.asset_value': 'Geschatte Waarde van het Eigendom',
    'form.deadline': 'Maximale gewenste deadline voor verkoop',
    'form.deadline.placeholder': 'Selecteer een deadline',
    'form.deadline.8months': '8 maanden',
    'form.deadline.10months': '10 maanden',
    'form.deadline.12months': '12 maanden',
    'form.message': 'Aanvullende Informatie',
    'form.message.placeholder': 'Vermeld de oppervlakte, aantal kamers, algemene staat, enz.',
    'form.photos': 'Foto\'s van het Eigendom',
    'form.photos.upload': 'Klik om foto\'s toe te voegen',
    'form.photos.format': 'PNG, JPG, JPEG tot 10MB',
    'form.submit': 'Verzenden',
    'form.submitting': 'Verzenden...',
    'form.required': '*',
    'form.error.required': 'Dit veld is verplicht',
    'form.consent': 'Ik ga ermee akkoord dat mijn persoonlijke gegevens worden verwerkt in overeenstemming met het',
    'form.consent.privacy_policy': 'privacybeleid',
    'form.error.consent': 'U moet het privacybeleid accepteren om door te gaan',

    'privacy.title': 'Privacybeleid',
    'privacy.intro': 'OptionImmo zet zich in om uw persoonlijke gegevens te beschermen en uw rechten te respecteren in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG).',
    'privacy.collection.title': '1. Gegevensverzameling',
    'privacy.collection.text': 'We verzamelen de volgende persoonlijke gegevens: voornaam, achternaam, e-mail, telefoonnummer, informatie over uw eigendom (type, locatie, geschatte waarde, foto\'s) en eventuele aanvullende informatie die u kiest te verstrekken.',
    'privacy.purpose.title': '2. Doel van Verwerking',
    'privacy.purpose.text': 'Uw gegevens worden verzameld om uw vastgoedwaarderingsverzoek te verwerken, contact met u op te nemen om uw project te bespreken, onze zakelijke relatie te beheren en u onze vastgoedoptiediensten aan te bieden.',
    'privacy.legal.title': '3. Juridische Basis',
    'privacy.legal.text': 'De verwerking van uw gegevens is gebaseerd op uw expliciete toestemming die u ons geeft bij het indienen van het contactformulier.',
    'privacy.recipients.title': '4. Ontvangers van Gegevens',
    'privacy.recipients.text': 'Uw gegevens zijn bestemd voor OptionImmo teams (vertegenwoordigers, vastgoedadviseurs). Ze kunnen ook worden gedeeld met onze partners (notarissen, vastgoedexperts, gekwalificeerde investeerders) alleen voor het verwerken van uw verzoek en met uw voorafgaande toestemming.',
    'privacy.retention.title': '5. Bewaartermijn',
    'privacy.retention.text': 'Uw persoonlijke gegevens worden bewaard gedurende 3 jaar vanaf ons laatste contact met u. Na deze periode worden ze verwijderd of geanonimiseerd, behalve bij langere wettelijke bewaarplichten.',
    'privacy.rights.title': '6. Uw Rechten',
    'privacy.rights.text': 'In overeenstemming met de AVG heeft u de volgende rechten:',
    'privacy.rights.access': 'Recht op toegang: verkrijg een kopie van uw persoonlijke gegevens',
    'privacy.rights.rectification': 'Recht op rectificatie: corrigeer onjuiste of onvolledige gegevens',
    'privacy.rights.erasure': 'Recht op gegevenswissing: verzoek om verwijdering van uw gegevens',
    'privacy.rights.restriction': 'Recht op beperking: beperk de verwerking van uw gegevens',
    'privacy.rights.portability': 'Recht op overdraagbaarheid: ontvang uw gegevens in een gestructureerd formaat',
    'privacy.rights.objection': 'Recht van bezwaar: bezwaar maken tegen de verwerking van uw gegevens',
    'privacy.rights.withdraw': 'Recht om toestemming in te trekken: op elk moment, zonder de rechtmatigheid van eerdere verwerking te beïnvloeden',
    'privacy.exercise.title': '7. Uitoefenen van Uw Rechten',
    'privacy.exercise.text': 'Om een van deze rechten uit te oefenen, neem contact met ons op via e-mail op contact@optionimmo.be of per post op ons adres. We verbinden ons ertoe binnen een maand te antwoorden.',
    'privacy.security.title': '8. Gegevensbeveiliging',
    'privacy.security.text': 'We implementeren passende technische en organisatorische maatregelen om uw gegevens te beschermen tegen ongeautoriseerde toegang, verlies, vernietiging of wijziging.',
    'privacy.complaint.title': '9. Recht op Klacht',
    'privacy.complaint.text': 'U heeft het recht een klacht in te dienen bij de Gegevensbeschermingsautoriteit (GBA) als u van mening bent dat de verwerking van uw gegevens de AVG schendt.',
    'privacy.updates.title': '10. Wijzigingen',
    'privacy.updates.text': 'We behouden ons het recht voor om dit privacybeleid te wijzigen. Elke wijziging wordt gepubliceerd op deze pagina met een bijwerkdatum.',
    'privacy.contact.title': '11. Contact',
    'privacy.contact.text': 'Voor vragen over dit privacybeleid of de verwerking van uw persoonlijke gegevens, neem contact met ons op via:',
    'privacy.contact.email': 'E-mail: contact@optionimmo.be',
    'privacy.contact.phone': 'Telefoon: +32 (0)2 XXX XX XX',
    'privacy.last_updated': 'Laatste update: 15 januari 2026',

    'footer.description': 'Verzeker de verkoop van uw woning tegen de juiste prijs dankzij de vastgoedoptie: exclusiviteit voor de koper, vrijheid en een gegarandeerde premie voor u.',
    'footer.contact_info': 'Contactinformatie',
    'footer.hours': 'Beschikbaarheid',
    'footer.hours.weekday': 'Maandag - Vrijdag: 9:00 - 18:00',
    'footer.hours.saturday': 'Zaterdag: 9:00 - 14:00',
    'footer.hours.sunday': 'Zondag: Niet beschikbaar',
    'footer.copyright': 'OptionImmo. Alle rechten voorbehouden.',

    'cookies.title': 'We gebruiken cookies',
    'cookies.description': 'We gebruiken cookies om uw ervaring op onze site te verbeteren, verkeer te analyseren en inhoud te personaliseren. Door op "Accepteren" te klikken, stemt u in met het gebruik van alle cookies. U kunt ook niet-essentiële cookies weigeren.',
    'cookies.accept': 'Alle cookies accepteren',
    'cookies.reject': 'Weigeren',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'fr';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
