import config from "../config/config";
import { Client, Databases,Storage,Query, ID } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client.setEndpoint(config.appwriteurl).setProject(config.appwriteprojectid);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client)
    }
    async createpost ({title,slug,content,featuredimg,userid,status}){
        try {
            return await this.databases.createDocument(config.appwritdatabaseid,config.appwritecollectionid,
                slug,{
                    title,content,featuredimg,userid,status
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
    }
    async updatepost (slug,{title,content,featuredimg,status}){//select slug seperate for get an id first place
        try {
            return await this.databases.updateDocument(config.appwritdatabaseid,config.appwritecollectionid,slug,{
                title,
                content,
                featuredimg,
                status//all for new post attribute
            }) 
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
    }
    async deletepost(slug){
        try {
            await this.databases.deleteDocument(config.appwritdatabaseid,config.appwritecollectionid,slug);
            return true;
        }
        
        catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
    }
    async getpost(slug){
        try {
            return await this.databases.getDocument(config.appwritdatabaseid,config.appwritecollectionid,slug);   
        }
        catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
    }
    async getposts(quries = [Query.equal("status","active")])//find the all posts
    {
        try {
            return await this.databases.listDocuments(config.appwritdatabaseid,config.appwritecollectionid,quries);   
        }
        catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
            
        }
    }
    //file upload service
    async uploadfile(file){
        try {
            await this.bucket.createFile(config.appwritebucketid,ID.unique(),file)
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
    }
    async deletefile(fileId){
        try {
            await this.bucket.deleteFile(config.appwritebucketid,fileId);
            return true;
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
    }
    getfilepreview(fileId){
        return this.bucket.getFilePreview(config.appwritebucketid,fileId)
    }
}
const service = new Service()
export default service;