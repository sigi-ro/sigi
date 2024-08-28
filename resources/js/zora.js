const Zora = { translations: {"en":{"php":{"auth":{"failed":"These credentials do not match our records.","password":"The provided password is incorrect.","throttle":"Too many login attempts. Please try again in :seconds seconds."},"form":{"buttons":{"save":"Save Changes","register_interest":"Register Interest"}},"messages":{"welcome":"Welcome, :name","hello":"Hello, :name","my-courses":"My Courses","courses":"Courses","course":"Course","lecture":"Lecture","lectures":"lectures","homepage":"Homepage","logout":"Log out","about":"About","contact":"Contact","home":"Home","complete":"Complete","no-results":"No results","password":"Password","confirm-password":"Confirm Password","remember-me":"Remember me?","forgot-password":"Forgot password?","sign-in":"Sign In","password-reset":"Password reset","send-password-reset-link":"Send link to reset password","login":"Login","register":"Register","already-registered":"Already registered?","create-a-new-account":"Create a new account","register-for-course":"Register for course :name","profile":"Profile","my-profile":"My Profile","edit":"Edit","edit-profile":"Edit Profile","save-changes":"Save Changes","save":"Save","back":"Back","first-name":"First Name","last-name":"Last Name","email":"Email","request-refund":"Request Refund","request-refund-text":"To request a refund please send an email to","created-by":"Created by","author":"Author","course-content":"Course content","additional-course-details":"Additional course details","download-pdfs":"Download PDFs","resources-pdfs":"PDF Resources","files":"Files","confirm":"Confirm","cancel":"Cancel","are-you-sure":"Are you sure","perform-action-check":"Do you really want to perform this action?","mark-course-lecture-complete-default":"Do you really want to mark as complete?","mark-course-lecture-complete-refund-warning":"Do you really want to mark as complete :name? A refund will not\n    be available once you move to the next step.","mark-complete":"Mark Complete","minutes":"minutes","course-preview":"Course Preview","dates":"Dates","to":"to","videos":"videos","pay-in-full":"Pay in full","pay-in-instalments":"Pay in :numberOfInstalments instalments","purchase":"Purchase","payment-options":"Payment Options","purchase-success":"Purchase success","purchase-cancel":"Purchase cancel","payment-instalments":"Rate","sign-up":"Sign Up","this-course-includes":"This course includes","pay-in-instalments-note":"Paid monthly x :numberOfInstalments months","pay-in-full-note":"Save :savingPercentage%","settings":"Settings","users":"Users","announcements":"Announcements","programmes":"Programmes","labels":"Labels","purchases":"Purchases","webinars":"Webinars","weekly-webinars":"Weekly Webinars","biweekly-webinars":"Biweekly Webinars","file-manager":"File Manager","view":"View","create":"Create","create-directory":"Create directory","directory-name":"Directory Name","directories":"Directories","no-files":"No files","file-upload-text":"Drop files to upload","last-updated":"Last updated","size":"Size","file-extension":"File extension","payment-due":"Payment due","amount-due":"Amount due","make-payment":"Pay now","access-on-mobile":"Access on mobile","money-back-gurantee":"Money back guarantee","multiple-languages":"Multiple languages","certificate":"Certificate","captions":"Captions","lifetime-access":"Lifetime access","student-discount":"Student discount available","seo-exposure":"SEO Exposure","faq":"FAQ","testimonials":"Testimonials","about-author":"About author","color-reset-confirm":"This will reset all colors to their default values. Save changes to take effect."},"pagination":{"previous":"&laquo; Previous","next":"Next &raquo;"},"passwords":{"reset":"Your password has been reset!","sent":"We have emailed your password reset link!","throttled":"Please wait before retrying.","token":"This password reset token is invalid.","user":"We can't find a user with that email address."},"settings":{"edit":"Edit :setting Settings"},"validation":{"accepted":"The :attribute must be accepted.","accepted_if":"The :attribute field must be accepted when :other is :value.","active_url":"The :attribute is not a valid URL.","after":"The :attribute must be a date after :date.","after_or_equal":"The :attribute must be a date after or equal to :date.","alpha":"The :attribute may only contain letters.","alpha_dash":"The :attribute may only contain letters, numbers, dashes and underscores.","alpha_num":"The :attribute may only contain letters and numbers.","array":"The :attribute must be an array.","ascii":"The :attribute field must only contain single-byte alphanumeric characters and symbols.","before":"The :attribute must be a date before :date.","before_or_equal":"The :attribute must be a date before or equal to :date.","between":{"array":"The :attribute must have between :min and :max items.","file":"The :attribute must be between :min and :max kilobytes.","numeric":"The :attribute must be between :min and :max.","string":"The :attribute must be between :min and :max characters."},"boolean":"The :attribute field must be true or false.","can":"The :attribute field contains an unauthorized value.","confirmed":"The :attribute confirmation does not match.","current_password":"The password is incorrect.","date":"The :attribute is not a valid date.","date_equals":"The :attribute must be a date equal to :date.","date_format":"The :attribute does not match the format :format.","decimal":"The :attribute field must have :decimal decimal places.","declined":"The :attribute field must be declined.","declined_if":"The :attribute field must be declined when :other is :value.","different":"The :attribute and :other must be different.","digits":"The :attribute must be :digits digits.","digits_between":"The :attribute must be between :min and :max digits.","dimensions":"The :attribute has invalid image dimensions.","distinct":"The :attribute field has a duplicate value.","doesnt_end_with":"The :attribute field must not end with one of the following: :values.","doesnt_start_with":"The :attribute field must not start with one of the following: :values.","email":"The :attribute must be a valid email address.","ends_with":"The :attribute must end with one of the following: :values.","enum":"The selected :attribute is invalid.","exists":"The selected :attribute is invalid.","extensions":"The :attribute field must have one of the following extensions: :values.","file":"The :attribute must be a file.","filled":"The :attribute field must have a value.","gt":{"array":"The :attribute must have more than :value items.","file":"The :attribute must be greater than :value kilobytes.","numeric":"The :attribute must be greater than :value.","string":"The :attribute must be greater than :value characters."},"gte":{"array":"The :attribute must have :value items or more.","file":"The :attribute must be greater than or equal :value kilobytes.","numeric":"The :attribute must be greater than or equal :value.","string":"The :attribute must be greater than or equal :value characters."},"hex_color":"The :attribute field must be a valid hexadecimal color.","image":"The :attribute must be an image.","in":"The selected :attribute is invalid.","in_array":"The :attribute field does not exist in :other.","integer":"The :attribute must be an integer.","ip":"The :attribute must be a valid IP address.","ipv4":"The :attribute must be a valid IPv4 address.","ipv6":"The :attribute must be a valid IPv6 address.","json":"The :attribute must be a valid JSON string.","lowercase":"The :attribute field must be lowercase.","lt":{"array":"The :attribute must have less than :value items.","file":"The :attribute must be less than :value kilobytes.","numeric":"The :attribute must be less than :value.","string":"The :attribute must be less than :value characters."},"lte":{"array":"The :attribute must not have more than :value items.","file":"The :attribute must be less than or equal :value kilobytes.","numeric":"The :attribute must be less than or equal :value.","string":"The :attribute must be less than or equal :value characters."},"mac_address":"The :attribute field must be a valid MAC address.","max":{"array":"The :attribute may not have more than :max items.","file":"The :attribute may not be greater than :max kilobytes.","numeric":"The :attribute may not be greater than :max.","string":"The :attribute may not be greater than :max characters."},"max_digits":"The :attribute field must not have more than :max digits.","mimes":"The :attribute must be a file of type: :values.","mimetypes":"The :attribute must be a file of type: :values.","min":{"array":"The :attribute must have at least :min items.","file":"The :attribute must be at least :min kilobytes.","numeric":"The :attribute must be at least :min.","string":"The :attribute must be at least :min characters."},"min_digits":"The :attribute field must have at least :min digits.","missing":"The :attribute field must be missing.","missing_if":"The :attribute field must be missing when :other is :value.","missing_unless":"The :attribute field must be missing unless :other is :value.","missing_with":"The :attribute field must be missing when :values is present.","missing_with_all":"The :attribute field must be missing when :values are present.","multiple_of":"The :attribute field must be a multiple of :value.","not_in":"The selected :attribute is invalid.","not_regex":"The :attribute format is invalid.","numeric":"The :attribute must be a number.","password":"The password is incorrect.","present":"The :attribute field must be present.","present_if":"The :attribute field must be present when :other is :value.","present_unless":"The :attribute field must be present unless :other is :value.","present_with":"The :attribute field must be present when :values is present.","present_with_all":"The :attribute field must be present when :values are present.","prohibited":"The :attribute field is prohibited.","prohibited_if":"The :attribute field is prohibited when :other is :value.","prohibited_unless":"The :attribute field is prohibited unless :other is in :values.","prohibits":"The :attribute field prohibits :other from being present.","regex":"The :attribute format is invalid.","required":"The :attribute field is required.","required_array_keys":"The :attribute field must contain entries for: :values.","required_if":"The :attribute field is required when :other is :value.","required_if_accepted":"The :attribute field is required when :other is accepted.","required_unless":"The :attribute field is required unless :other is in :values.","required_with":"The :attribute field is required when :values is present.","required_with_all":"The :attribute field is required when :values are present.","required_without":"The :attribute field is required when :values is not present.","required_without_all":"The :attribute field is required when none of :values are present.","same":"The :attribute and :other must match.","size":{"array":"The :attribute must contain :size items.","file":"The :attribute must be :size kilobytes.","numeric":"The :attribute must be :size.","string":"The :attribute must be :size characters."},"starts_with":"The :attribute must start with one of the following: :values.","string":"The :attribute must be a string.","timezone":"The :attribute must be a valid zone.","unique":"The :attribute has already been taken.","uploaded":"The :attribute failed to upload.","uppercase":"The :attribute field must be uppercase.","url":"The :attribute format is invalid.","ulid":"The :attribute field must be a valid ULID.","uuid":"The :attribute must be a valid UUID.","custom":{"attribute-name":{"rule-name":"custom-message"},"email":{"exists":"The email could not be found."}},"attributes":[]}},"json":[]},"ro":{"php":{"auth":{"failed":"Parola sau Email incorect.","password":"Parola este gresita.","throttle":"Te rugam sa incerci mai tarziu :seconds seconds."},"form":{"buttons":{"save":"Salveaz\u0103 modific\u0103rile"}},"messages":{"welcome":"Bine ai venit, :name","welcome-general":"Bine ai venit","hello":"Bun\u0103, :name","my-courses":"Cursuri","courses":"Cursuri","course":"Curs","lecture":"Capitol","lectures":"capitole","homepage":"Acas\u0103","logout":"Log out","about":"Despre noi","contact":"Contact","home":"Acas\u0103","complete":"Complet","no-results":"Nici un rezultat","password":"Parola","confirm-password":"Confirm\u0103 Parola","remember-me":"\u021aine-m\u0103 minte","forgot-password":"A\u0163i uitat parola?","sign-in":"Logheaz\u0103-te","password-reset":"Resetare parol\u0103","send-password-reset-link":"Trimite linkul de resetare a parolei","login":"Autentificare","register":"\u00cenregistreaz\u0103-te","already-registered":"Deja \u00eenregistrat?","create-a-new-account":"Crea\u021bi un cont nou","register-for-course":"\u00cenregistreaz\u0103-te la cursul \":name\"","profile":"Profil","my-profile":"Profilul meu","edit":"Modifica","edit-profile":"Modific\u0103 Profil","save-changes":"Salveaz\u0103 Schimbari","save":"Salveaz\u0103","back":"\u00cenapoi","first-name":"Nume","last-name":"Prenume","email":"Email","request-refund":"Cere rambursare","request-refund-text":"Pentru a cere o rambursare te rugam sa trimiti un email la ","created-by":"Creat de","author":"Autor","course-content":"Con\u021binutul programului","additional-course-details":"Descriere program","download-pdfs":"Descarc\u0103 PDFs","resources-pdfs":"Resurse PDF","files":"Fi\u0219iere","confirm":"Confirm","cancel":"Anuleaz\u0103","are-you-sure":"E\u0219ti sigur","perform-action-check":"Sunte\u021bi sigur c\u0103 dori\u021bi s\u0103 efectua\u021bi aceast\u0103 ac\u021biune?","mark-course-lecture-complete-default":"Sunte\u021bi sigur c\u0103 dori\u021bi s\u0103 marca\u021bi ca fiind completa aceasta sectiune?","mark-course-lecture-complete-refund-warning":"Sunte\u021bi sigur c\u0103 dori\u021bi s\u0103 marca\u021bi ca fiind completa sectiunea :name?\n    O rambursare nu va fi disponibil\u0103 odat\u0103 ce trece\u021bi la pasul urm\u0103tor.","mark-complete":"Completeaz\u0103","mark-complete-success":"Completat cu succes.","minutes":"minute","course-preview":"Preview program","dates":"Data","to":"pana la","videos":"Videoclipuri","pay-in-full":"Pl\u0103te\u0219te integral","pay-in-instalments":"Pl\u0103te\u0219te \u00een :numberOfInstalments rate","purchase":"Comand\u0103 acum","purchase-success":"Comand\u0103 plasat\u0103","purchase-cancel":"Comand\u0103 anulat\u0103","payment-options":"Op\u021biuni de plat\u0103","payment-instalments":"Rate","sign-up":"\u00censcrie-te acum","this-course-includes":"Acest program include","pay-in-instalments-note":"Facturat lunar x :numberOfInstalments luni","pay-in-full-note":"Economise\u0219ti :savingPercentage%","settings":"Set\u0103ri","users":"Utilizatori","announcements":"Anun\u021buri","programmes":"Programe","labels":"Etichete","purchases":"Achizi\u021bii","webinars":"Webinarii","weekly-webinars":"Webinarii S\u0103pt\u0103m\u00e2nale","biweekly-webinars":"Webinarii Bis\u0103pt\u0103m\u00e2nale","file-manager":"File Manager","view":"Vezi","create":"Creaz\u0103","create-directory":"Creaz\u0103 folder","directory-name":"Nume folder","directories":"Foldere","no-files":"Nici un fi\u0219ier","file-upload-text":"Plasa\u021bi fi\u0219iere aici pentru a le \u00eenc\u0103rca","last-updated":"Ultima actualizare","size":"Dimensiune","file-extension":"Fi\u0219ier de tip","payment-due":"Ordin de plat\u0103","amount-due":"Suma de plat\u0103","make-payment":"Pl\u0103te\u0219te acum","access-on-mobile":"Acces prin smartphone","money-back-gurantee":"Banii \u00eenapoi garantat","multiple-languages":"Mai multe limbi disponibile","certificate":"Certificat","captions":"Subtitr\u0103ri","lifetime-access":"Acces pe via\u021b\u0103","student-discount":"Reducere pentru studen\u021bi disponibil\u0103","seo-exposure":"Expunerea SEO","faq":"\u00centreb\u0103ri frecvente","testimonials":"Testimoniale","about-author":"Despre autor","color-reset-confirm":"Acest\u0103 actiune va reseta toate culorile la valorile lor implicite. Salva\u021bi modific\u0103rile pentru a intra \u00een vigoare."},"pagination":{"previous":"&laquo; Pagina anterioara","next":"Pagina urmatoare &raquo;"},"passwords":{"reset":"Parola a fost resetatat.","sent":"Am trimis prin e-mail linkul de resetare a parolei. ","throttled":"V\u0103 rug\u0103m s\u0103 a\u0219tepta\u021bi \u00eenainte de a re\u00eencerca.","token":"Acest link de resetare a parolei este invalid.","user":"Nu putem g\u0103si un utilizator cu aceste date."},"settings":{"edit":"Editeaza :setting Setarile"},"validation":{"accepted":"The :attribute field must be accepted.","accepted_if":"The :attribute field must be accepted when :other is :value.","active_url":"The :attribute field must be a valid URL.","after":"The :attribute field must be a date after :date.","after_or_equal":"The :attribute field must be a date after or equal to :date.","alpha":"The :attribute field must only contain letters.","alpha_dash":"The :attribute field must only contain letters, numbers, dashes, and underscores.","alpha_num":"The :attribute field must only contain letters and numbers.","array":"The :attribute field must be an array.","ascii":"The :attribute field must only contain single-byte alphanumeric characters and symbols.","before":"The :attribute field must be a date before :date.","before_or_equal":"The :attribute field must be a date before or equal to :date.","between":{"array":"The :attribute field must have between :min and :max items.","file":"The :attribute field must be between :min and :max kilobytes.","numeric":"The :attribute field must be between :min and :max.","string":"The :attribute field must be between :min and :max characters."},"boolean":"The :attribute field must be true or false.","can":"The :attribute field contains an unauthorized value.","confirmed":"The :attribute field confirmation does not match.","current_password":"Parola este incorecta. ","date":"The :attribute field must be a valid date.","date_equals":"The :attribute field must be a date equal to :date.","date_format":"The :attribute field must match the format :format.","decimal":"The :attribute field must have :decimal decimal places.","declined":"The :attribute field must be declined.","declined_if":"The :attribute field must be declined when :other is :value.","different":"The :attribute field and :other must be different.","digits":"The :attribute field must be :digits digits.","digits_between":"The :attribute field must be between :min and :max digits.","dimensions":"The :attribute field has invalid image dimensions.","distinct":"The :attribute field has a duplicate value.","doesnt_end_with":"The :attribute field must not end with one of the following: :values.","doesnt_start_with":"The :attribute field must not start with one of the following: :values.","email":"Adresa de email trebuie sa fie valida.","ends_with":"The :attribute field must end with one of the following: :values.","enum":"The selected :attribute is invalid.","exists":"The selected :attribute is invalid.","file":"The :attribute field must be a file.","filled":"The :attribute field must have a value.","gt":{"array":"The :attribute field must have more than :value items.","file":"The :attribute field must be greater than :value kilobytes.","numeric":"The :attribute field must be greater than :value.","string":"The :attribute field must be greater than :value characters."},"gte":{"array":"The :attribute field must have :value items or more.","file":"The :attribute field must be greater than or equal to :value kilobytes.","numeric":"The :attribute field must be greater than or equal to :value.","string":"The :attribute field must be greater than or equal to :value characters."},"image":"The :attribute field must be an image.","in":"The selected :attribute is invalid.","in_array":"The :attribute field must exist in :other.","integer":"The :attribute field must be an integer.","ip":"The :attribute field must be a valid IP address.","ipv4":"The :attribute field must be a valid IPv4 address.","ipv6":"The :attribute field must be a valid IPv6 address.","json":"The :attribute field must be a valid JSON string.","lowercase":"The :attribute field must be lowercase.","lt":{"array":"The :attribute field must have less than :value items.","file":"The :attribute field must be less than :value kilobytes.","numeric":"The :attribute field must be less than :value.","string":"The :attribute field must be less than :value characters."},"lte":{"array":"The :attribute field must not have more than :value items.","file":"The :attribute field must be less than or equal to :value kilobytes.","numeric":"The :attribute field must be less than or equal to :value.","string":"The :attribute field must be less than or equal to :value characters."},"mac_address":"The :attribute field must be a valid MAC address.","max":{"array":"The :attribute field must not have more than :max items.","file":"The :attribute field must not be greater than :max kilobytes.","numeric":"The :attribute field must not be greater than :max.","string":"The :attribute field must not be greater than :max characters."},"max_digits":"The :attribute field must not have more than :max digits.","mimes":"C\u00e2mpul :attribute trebuie sa fie un fisier de tip: :values.","mimetypes":"The :attribute field must be a file of type: :values.","min":{"array":"The :attribute field must have at least :min items.","file":"The :attribute field must be at least :min kilobytes.","numeric":"The :attribute field must be at least :min.","string":"The :attribute field must be at least :min characters."},"min_digits":"The :attribute field must have at least :min digits.","missing":"The :attribute field must be missing.","missing_if":"The :attribute field must be missing when :other is :value.","missing_unless":"The :attribute field must be missing unless :other is :value.","missing_with":"The :attribute field must be missing when :values is present.","missing_with_all":"The :attribute field must be missing when :values are present.","multiple_of":"The :attribute field must be a multiple of :value.","not_in":"The selected :attribute is invalid.","not_regex":"The :attribute field format is invalid.","numeric":"The :attribute field must be a number.","password":{"letters":"Parola trebuie s\u0103 con\u021bin\u0103 cel putin o liter\u0103.","mixed":"Parola trebuie s\u0103 con\u021bin\u0103 cel pu\u021bin o liter\u0103 mare \u0219i o liter\u0103 mic\u0103.","numbers":"Parola trebuie s\u0103 con\u021bin\u0103 cel pu\u021bin un num\u0103r.","symbols":"Parola trebuie s\u0103 con\u021bin\u0103 cel pu\u021bin un simbol.","uncompromised":"Aceast\u0103 parol\u0103 a ap\u0103rut \u00eentr-o scurgere de date. V\u0103 rug\u0103m s\u0103 alege\u021bi o alt\u0103 parol\u0103.","min":"Parola trebuie s\u0103 con\u021bin\u0103 cel putin :min caractere."},"present":"The :attribute field must be present.","present_if":"The :attribute field must be present when :other is :value.","present_unless":"The :attribute field must be present unless :other is :value.","present_with":"The :attribute field must be present when :values is present.","present_with_all":"The :attribute field must be present when :values are present.","prohibited":"The :attribute field is prohibited.","prohibited_if":"The :attribute field is prohibited when :other is :value.","prohibited_unless":"The :attribute field is prohibited unless :other is in :values.","prohibits":"The :attribute field prohibits :other from being present.","regex":"The :attribute field format is invalid.","required":"Campul :attribute este obligatoriu.","required_array_keys":"The :attribute field must contain entries for: :values.","required_if":"The :attribute field is required when :other is :value.","required_if_accepted":"The :attribute field is required when :other is accepted.","required_unless":"The :attribute field is required unless :other is in :values.","required_with":"The :attribute field is required when :values is present.","required_with_all":"The :attribute field is required when :values are present.","required_without":"The :attribute field is required when :values is not present.","required_without_all":"The :attribute field is required when none of :values are present.","same":"The :attribute field must match :other.","size":{"array":"The :attribute field must contain :size items.","file":"The :attribute field must be :size kilobytes.","numeric":"The :attribute field must be :size.","string":"The :attribute field must be :size characters."},"starts_with":"The :attribute field must start with one of the following: :values.","string":"The :attribute field must be a string.","timezone":"The :attribute field must be a valid timezone.","unique":"The :attribute has already been taken.","uploaded":"Incarcare esuata pentru :attribute .","uppercase":"C\u00e2mpul :attribute trebuie s\u0103 fie majuscule.","url":"C\u00e2mpul :attribute trebuie s\u0103 fie un URL valid.","ulid":"The :attribute field must be a valid ULID.","uuid":"The :attribute field must be a valid UUID.","custom":{"email":{"exists":"Email-ul nu a fost gasit."}},"attributes":[]}},"json":[]}} }

if (typeof window !== 'undefined' && typeof window.Zora !== 'undefined') {
  Object.assign(Zora.routes, window.Zora.routes);
}

export { Zora }
