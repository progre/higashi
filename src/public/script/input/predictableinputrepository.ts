// import InputRepository from './inputrepository';
// import Input from './input';
// import Controller from './controller';

// export default class PredictableInputRepository {
// 	private inputRepository = new InputRepository();
// 	/** 最大予測入力数 */
// 	maxPrediction: number;

// 	/** 予測入力を開始したフレーム。currentFrame < predictionStartFrame の時は予測入力をしていない */
// 	private predictionStartFrame = 0;
// 	/** 現在の予測入力 */
// 	private predictionInputs: Input[] = [];

// 	/**
// 	 * 現在のフレームの入力を返し、フレームを進める
// 	 * kariInputを使っている場合、realが着てるか確認して、巻き戻りの要否を判断する必要がある
// 	 * realInputにあればその値を返す
// 	 */
// 	shiftInput() {
// 		this.currentFrame++;
// 		var inputs = this.cleanupPredictionInputs();
// 		var latest = this.inputs[this.currentFrame];
// 		if (latest != null && latest.filled()) {
// 			if (this.hasPrediction()) {
// 				this.predictionInputs.push(latest);
// 			}
// 			inputs.push(latest);
// 			return inputs;
// 		}
// 		latest = getPreviousInput(this.inputs, this.currentFrame, this.predictionInputs, this.predictionStartFrame);
// 		inputs.push(latest);
// 		this.predictionInputs.push(latest);
// 		return inputs;
// 	}

// 	private cleanupPredictionInputs() {
// 		for (; this.predictionStartFrame < this.currentFrame; this.predictionStartFrame++) {
// 			var input = this.inputs[this.predictionStartFrame];
// 			if (input == null || !input.filled()) {
// 				return [];
// 			}
// 			if (!input.equals(this.predictionInputs.shift())) {
// 				return createRetransmissionFrame(this.inputs, this.predictionInputs, this.predictionStartFrame);
// 			}
// 		}
// 		return [];
// 	}

// 	private hasPrediction() {
// 		return this.predictionStartFrame <= this.currentFrame;
// 	}
// }

// function getPreviousInput(inputs: Input[], currentFrame: number, predictionInputs: Input[], predictionStartFrame: number) {
// 	if (currentFrame === 0) {
// 		return new Input();
// 	}
// 	var target = currentFrame - 1;
// 	var prev = inputs[target];
// 	if (prev != null && prev.filled()) {
// 		return prev;
// 	}
// 	return predictionInputs[target - predictionStartFrame];
// }

// function createRetransmissionFrame(inputs: Input[], predictionInputs: Input[], startFrame: number) {
// 	return inputs.slice(startFrame)
// 		.map((value, i) =>
// 			value.filled()
// 				? value
// 				: predictionInputs[i - startFrame]);
// }
