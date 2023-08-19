const asyncHandler = require("express-async-handler");
//When we interact with mongoDB we get promise so we use async await for async await we must use try catch block to avoid
//this we use asyncHandler middleware package 

const Contact = require("../models/contactModel");

// @desc Get all contacts
// @route GET /api/contacts
// @access public
const getContacts = asyncHandler(async (req,res)=>{
    const contacts = await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
});

// @desc Get contact
// @route GET /api/contacts/:id
// @access public
const getContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(400);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

// @desc Create contact
// @route Create /api/contacts
// @access public
const createContact = asyncHandler(async (req,res)=>{
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All feilds are mandatory");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    })

    res.status(200).json(contact);
});

// @desc Update contact
// @route Put /api/contacts/:id
// @access public
const updateContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(400);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have a access");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true},
    )
    res.status(200).json(updatedContact);
});

// @desc delete contact
// @route Deleye /api/contacts/:id
// @access public
const deleteContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(400);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have a access");
    }
    await contact.deleteOne();
    res.status(200).json(contact);
});

module.exports = {getContacts,getContact,createContact,updateContact,deleteContact};