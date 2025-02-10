import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account; // Corrected casing: account, not Account
    constructor() {
        this.client.setEndpoint(config.appwriteurl).setProject(config.appwriteprojectid);
        this.account = new Account(this.client); // Initialize with lowercase 'account'
    }

    async createaccount({ email, password, name }) {
        try {
            const useraccount = await this.account.create(ID.unique(), name, email, password);
            if (useraccount) {
                return this.login({ email, password }); // Log in immediately after creation
            } else {
                return useraccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            // Important: Wait for session confirmation (if necessary)
            if (session) {
                return this.getcurrentuser(); // Get user after successful login
            } else {
                console.error("Login failed: No session returned.");
                return null; // Or throw an error
            }
        } catch (error) {
            throw error;
        }
    }


    async getcurrentuser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("Appwrite service :: getCurrentUser :: error", error);

            // Robust error handling (as before):
            if (error.message && error.message.includes("User not found")) {
                return null;
            } else if (error.code === 401 || (error.response && error.response.status === 401)) {
                return null;
            }

            throw error;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("Appwrite service :: logout :: error", error);
            throw error;
        }
    }

    async isloggedin() {
        try {
            const user = await this.account.get();
            return !!user;
        } catch (error) {
            return false;
        }
    }
}

const authservice = new AuthService();
export default authservice;