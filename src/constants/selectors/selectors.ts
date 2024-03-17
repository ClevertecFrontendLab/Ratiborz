import { RootState } from '@redux/configure-store';

export const repeatRequestsSelector = (state: RootState) => state.repeatRequests;
export const rememberMeSelector = (state: RootState) => state.registration.rememberMe;
export const loadingSelector = (state: RootState) => state.registration.loading;
export const emaildataSelector = (state: RootState) => state.repeatRequests.emailCheck;
export const emailValueSelector = (state: RootState) => state.registration.email;
export const newDataPassSelector = (state: RootState) => state.repeatRequests;
export const emailValueRegistration = (state: RootState) => state.registration.email;

export const warningSelector = (state: RootState) => state.feedback.warning;
export const beFeedbackSelector = (state: RootState) => state.feedback.isFeedbackData;
export const isModalCreateFeedbackSelector = (state: RootState) =>
    state.feedback.isModalCreateFeedbackOpen;
export const isCreateFeedbackSuccessSelector = (state: RootState) =>
    state.feedback.isCreateFeedbackSuccess;
export const StateModalErrorSelector = (state: RootState) => state.feedback.StateModalError;
export const dataReviewSelector = (state: RootState) => state.feedback.dataReview;

export const isModalOpenSelector = (state: RootState) => state.commonModal.warning;
export const withOpenModalErrorSelector = (state: RootState) => state.calendar.warning;
export const trainingListRepeatSelector = (state: RootState) => state.calendar.repeatRequest;
export const trainingDataSelector = (state: RootState) => state.calendar.trainingData;
export const trainingsListSelector = (state: RootState) => state.calendar.trainingsList;
export const inputsDataSelector = (state: RootState) => state.calendar.inputsData;
export const selectedTrainingSelector = (state: RootState) => state.calendar.selectedTraining;
export const modalErrorWithSaveSelector = (state: RootState) => state.calendar.modalError;
export const editFlowSelector = (state: RootState) => state.calendar.editFlow;
export const firstSelectedTrainingSelector = (state: RootState) =>
    state.calendar.firtsSelectedTraining;
