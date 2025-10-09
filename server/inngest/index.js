import { Inngest } from "inngest";
import User from "../models/User.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-ticket-booking" });

// Inngest Function to save user data to a database
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      image: image_url,
    };

    try {
      await User.create(userData);
    } catch (error) {
      console.error('Failed to create user:', error);
      throw error; // Inngest will retry
    }
  }
);

// Inngest Function to update user data in database
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
async ({ event }) => {
  const { id } = event.data;
  try {
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      console.warn(`User with id ${id} not found for deletion`);
    }
  } catch (error) {
    console.error('Failed to delete user:', error);
    throw error;
  }
}
  }
);

// Inngest Function to update user data in database
 // Inngest Function to update user data in database
 const syncUserUpdation = inngest.createFunction(
   { id: "update-user-from-clerk" },
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      image: image_url,
    };
    await User.findByIdAndUpdate(id, userData);
  }
);

// Create an empty array where we'll export future Inngest functions
export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdation];
