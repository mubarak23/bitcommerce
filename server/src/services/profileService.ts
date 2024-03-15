import { In } from "typeorm";
import { getFreshConnection } from "../db";
import { User } from "../entity/User";
import { IProfile } from "../interfaces/IProfile";


export const IPublicProfile = async (currentUser: User): Promise<IProfile> => {
    const resProfile: IProfile =  {
        uuid: currentUser.uuid,
        walletName: currentUser.walletName,
        emailAddress: currentUser.emailAddress,
       
    }
    return resProfile
}

export const getPublicProfileFromUserIds = async (userIds: number[]): Promise<IProfile[]> => {
    if (!userIds.length) {
      return []
    }
  
    const connection = await getFreshConnection()
  
    const userRepo = connection.getRepository(User)
    const users = await userRepo.find({
      id: In(userIds),
    })
    if (!users.length) {
      return []
    }
  
    
    const profilesData: IProfile[] = []
    
    for(const user of users) {
      const userData = users.find(u => u.id === user.id)
      if(!userData) {
        continue
      }
  
      profilesData.push({
        uuid: user.uuid,
        walletName: user.walletName,
        emailAddress: user.emailAddress,
        
      })
    }
  
    return profilesData
  }
