// import logger from '../../logger'

// import { utcNow } from '../../utils/core'
// import { CronRun } from '../../entity/CronRun'
// import { getFreshConnection } from '../../db'

// export default abstract class BaseCron {

//   public abstract startWorking() : Promise<void>;

//   public async handler(jobName: string): Promise<any> {
//     logger.info(`Inside: ${jobName}`)
//     const connection = await getFreshConnection()
//     const cronRunRepo = connection.getRepository(CronRun)

//     let cronRun = await cronRunRepo.findOne({
//       name: jobName
//     })

//     if(cronRun) {
//         cronRun.isRunning = true
//         cronRun.lastRunStart = utcNow()
//         cronRun.lastRunEnd = undefined
//         await cronRunRepo.save(cronRun)
//     } else {
//       cronRun = new CronRun().initialize(jobName, utcNow())
//       await cronRunRepo.save(cronRun)
//     }
//     //--
//     try {
//       await this.startWorking()
//     } catch(e) {
//       logger.error(e)
//     } finally {
//       await cronRunRepo.createQueryBuilder()
//         .update(CronRun)
//         .set({
//           isRunning: false,
//           lastRunEnd: utcNow()
//         })
//         .whereInIds([cronRun.id])
//         .execute()
//     }
//   }
// }
