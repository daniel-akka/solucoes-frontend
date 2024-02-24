import SituacaoDto from '@/classes/dto/ClSituacaoDto';

export default interface ISituacaoServices{    

   get(id: string):  Promise<SituacaoDto | undefined>

}