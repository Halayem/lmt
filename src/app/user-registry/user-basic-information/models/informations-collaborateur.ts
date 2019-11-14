export interface Profile {
    titre: String;
 } 
export interface InformationsCollaborateur {
    nom : String;
    prenom: String;
    dateArrive: Date;
    mail: String;
    telephone: Number;
    profile: Profile;
}
