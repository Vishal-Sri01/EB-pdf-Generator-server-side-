namespace my.company;

entity Employees {
   key ID         : Integer;
       name       : String;
       email      : String;
       jobTitle   : String;
       department : String;
       startDate  : Date;
       Salary     : Decimal(10,2);
       phoneNumber: String;
       address    : String;
}
