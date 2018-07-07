module Search {
    export class SearchParameter {
        private parameterName: string;
        private parameterWeight: number;

        constructor(parameterName: string, parameterWeight: number) {
            this.parameterName = parameterName;
            this.parameterWeight = parameterWeight;
        }

        public getParameterName(): string {
            return this.parameterName;
        }

        public getParameterWeight(): number {
            return this.parameterWeight;
        }
    }
}
