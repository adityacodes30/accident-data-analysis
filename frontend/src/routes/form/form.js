export default function FormPage() {
    return (
        <>
            <Paper>
                <h1>Form page</h1>
                <form>
                    <TextField
                        id="district-name"
                        label="District Name"
                        variant="outlined"
                    />
                    <TextField
                        id="unit-name"
                        label="Unit Name"
                        variant="outlined"
                    />
                    <TextField
                        id="month"
                        label="Month"
                        variant="outlined"
                    />
                    <TextField
                        id="accident-spot"
                        label="Accident Spot"
                        variant="outlined"
                    />
                    <TextField
                        id="accident-sublocation"
                        label="Accident Sublocation"
                        variant="outlined"
                    />
                    <TextField
                        id="road-type"
                        label="Road Type"
                        variant="outlined"
                    />
                    <Button variant="contained" color="primary">
                        Submit
                    </Button>
                </form>
            </Paper>
        </>
    );
}