import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
	client = new Client();
	account;

	constructor() {
		this.client
			.setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
	}

  // appwrite signup user
	async createAccount({ email, password, name }) {
		try {
			const userAccount = await this.account.create(
				ID.unique(),
				email,
				password,
				name
			);
			if (userAccount) {
				return this.login({ email, password });
				//call another method
			} else {
				return userAccount;
			}
		} catch (error) {
			throw error;
		}
	}

  // appwrite login user
	async login({ email, password }) {
		try {
			return await this.account.createEmailSession(email, password);
		} catch (error) {
			throw error;
		}
	}

  //appwrite check user
	async getCurrentUser() {
		try {
			return await this.account.get();
		} catch (error) {
			console.log("Appwrite service :: getCurrentUser :: error", error);
		}

		return null;
	}

  // appwrite logout method
	async logout() {
		try {
			await this.account.deleteSessions();
		} catch (error) {
			console.log("Appwrite service :: logout :: error", error);
		}
	}
}

const authService = new AuthService();

export default authService;
