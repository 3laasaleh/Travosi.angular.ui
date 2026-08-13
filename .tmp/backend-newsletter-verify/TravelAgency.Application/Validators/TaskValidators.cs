using FluentValidation;
using TravelAgency.Application.DTOs.Tasks;

namespace TravelAgency.Application.Validators
{
    public class CreateAgentTaskDTOValidator : AbstractValidator<CreateAgentTaskDTO>
    {
        public CreateAgentTaskDTOValidator()
        {
            RuleFor(x => x.Title).NotEmpty().MaximumLength(200);
            RuleFor(x => x.Description).MaximumLength(2000);
            RuleFor(x => x.TaskType).IsInEnum();
            RuleFor(x => x.Priority).IsInEnum();
            RuleFor(x => x.AssignedToAgentId).GreaterThan(0).WithMessage("An agent must be assigned to the task.");
            RuleFor(x => x.DueDate)
                .GreaterThan(DateTime.UtcNow.Date)
                .When(x => x.DueDate.HasValue)
                .WithMessage("Due date must be in the future.");
        }
    }

    public class UpdateAgentTaskDTOValidator : AbstractValidator<UpdateAgentTaskDTO>
    {
        public UpdateAgentTaskDTOValidator()
        {
            RuleFor(x => x.Id).GreaterThan(0);
            RuleFor(x => x.Title).NotEmpty().MaximumLength(200);
            RuleFor(x => x.Description).MaximumLength(2000);
            RuleFor(x => x.TaskType).IsInEnum();
            RuleFor(x => x.Priority).IsInEnum();
            RuleFor(x => x.AssignedToAgentId).GreaterThan(0).WithMessage("An agent must be assigned to the task.");
        }
    }

    public class UpdateTaskProgressDTOValidator : AbstractValidator<UpdateTaskProgressDTO>
    {
        public UpdateTaskProgressDTOValidator()
        {
            RuleFor(x => x.Id).GreaterThan(0);
            RuleFor(x => x.Status).IsInEnum();
            RuleFor(x => x.AgentNotes).MaximumLength(2000);
        }
    }
}
