using ContactMgmtWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace ContactMgmtWebAPI.RestAPI
{
    public class ContactAPIController : ApiController
    {
        
        ContactDBEntities dbContext = null;
        // Constructor   
        public ContactAPIController()
        {
            // create instance of an object  
            dbContext = new ContactDBEntities();
        }
        [ResponseType(typeof(tblContact))]
        [HttpPost]
        public HttpResponseMessage SaveContact(tblContact a_contact)
        {
            int result = 0;
            try
            {
                dbContext.tblContacts.Add(a_contact);
                dbContext.SaveChanges();
                result = 1;
            }
            catch (Exception e)
            {
                result = 0;
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [ResponseType(typeof(tblContact))]
        [HttpPut]
        public HttpResponseMessage UpdateContact(tblContact a_contact)
        {
            int result = 0;
            try
            {
                dbContext.tblContacts.Attach(a_contact);
                dbContext.Entry(a_contact).State = EntityState.Modified;
                dbContext.SaveChanges();
                result = 1;
            }
            catch (Exception e)
            {

                result = 0;
            }

            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
        
        [ResponseType(typeof(tblContact))]
        [HttpDelete]
        public HttpResponseMessage DeleteContact(int id)
        {
            int result = 0;
            try
            {
                var contact = dbContext.tblContacts.Where(x => x.ContactID == id).FirstOrDefault();
                dbContext.tblContacts.Attach(contact);
                dbContext.tblContacts.Remove(contact);
                dbContext.SaveChanges();
                result = 1;
            }
            catch (Exception e)
            {

                result = 0;
            }

            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        
        [ResponseType(typeof(tblContact))]
        [HttpGet]
        public tblContact GetContactByID(int id)
        {
            tblContact a_contact = null;
            try
            {
                a_contact = dbContext.tblContacts.Where(x => x.ContactID == id).SingleOrDefault();

            }
            catch (Exception e)
            {
                a_contact = null;
            }

            return a_contact;
        }

        [ResponseType(typeof(tblContact))]
        [HttpGet]
        public List<tblContact> GetContacts()
        {
            List<tblContact> contacts = null;
            try
            {
                contacts = dbContext.tblContacts.ToList();

            }
            catch (Exception e)
            {
                contacts = null;
            }

            return contacts;
        }
    }
}
