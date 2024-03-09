interface ISimpleUserInfo {
  uuid: string,
  firstName: string,
  lastName: string,
  phoneVerificationOtp?: string | null, // -- for manual tests done in development environment
}

export default ISimpleUserInfo
